import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { TestAttempt } from '../entities/TestAttempt';
import { Topic } from '../entities/Topic';
import { User } from '../entities/User';
import { Question } from '../entities/Question';
import { Answer } from '../entities/Answer';
import { Not, IsNull, Between, In, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { QuestionDto, AnswerDto } from '../dtos/question.dto';

class AdminController {
  private questionRepository: Repository<Question>;
  private answerRepository: Repository<Answer>;

  constructor() {
    this.questionRepository = AppDataSource.getRepository(Question);
    this.answerRepository = AppDataSource.getRepository(Answer);
  }

  async getDashboardStats(req: Request, res: Response): Promise<Response> {
    try {
      // Total test attempts
      const totalAttempts = await AppDataSource.getRepository(TestAttempt).count();

      // Successful vs failed tests
      const testStatuses = await AppDataSource.getRepository(TestAttempt).find({
        select: ['status'],
      });

      const statusCounts = testStatuses.reduce(
        (acc, attempt) => {
          acc[attempt.status] = (acc[attempt.status] || 0) + 1;
          return acc;
        },
        { passed: 0, failed: 0, in_progress: 0 }
      );

      // Tests by type
      const testTypes = await AppDataSource.getRepository(TestAttempt).find({
        select: ['testType'],
      });

      const typeCounts = testTypes.reduce(
        (acc, attempt) => {
          acc[attempt.testType] = (acc[attempt.testType] || 0) + 1;
          return acc;
        },
        { exam: 0, topic: 0, hard: 0 }
      );

      // Most popular topic (based on number of sessions)
      const topicSessions = await AppDataSource.getRepository(TestAttempt).find({
        select: ['topicId'],
        where: { topicId: Not(IsNull()) },
      });

      const topicCounts = await AppDataSource.getRepository(Topic).find({
        select: ['id', 'name', 'questionsCount'],
      });

      // Count sessions per topic
      const topicSessionCounts = topicCounts.map(topic => {
        const sessionCount = topicSessions.filter(attempt => attempt.topicId === topic.id).length;
        return { ...topic, sessionCount };
      });

      // Sort topics by session count
      topicSessionCounts.sort((a, b) => b.sessionCount - a.sessionCount);

      // Calculate average correct answer rate
      const allAttempts = await AppDataSource.getRepository(TestAttempt).find();
      const totalCorrectAnswers = allAttempts.reduce(
        (sum, attempt) => sum + attempt.correctAnswers,
        0
      );
      const totalQuestions = allAttempts.reduce(
        (sum, attempt) => sum + attempt.totalQuestions,
        0
      );
      const averageCorrectRate = totalQuestions
        ? Math.round((totalCorrectAnswers / totalQuestions) * 100)
        : 0;

      // Total users
      const totalUsers = await AppDataSource.getRepository(User).count();

      // Users registered in the last month
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const usersRegisteredLastMonth = await AppDataSource.getRepository(User).count({
        where: {
          createdAt: Between(oneMonthAgo, new Date()),
        },
      });

      // Total questions
      const totalQuestionsCount = await this.questionRepository.count();

      return res.json({
        totalAttempts,
        statusCounts,
        typeCounts,
        topicCounts: topicSessionCounts,
        averageCorrectRate,
        totalUsers,
        usersRegisteredLastMonth,
        totalQuestionsCount,
      });
    } catch (error) {
      console.error('AdminController.getDashboardStats error:', error);
      return res.status(500).json({
        error: 'Failed to get dashboard stats',
        ...(process.env.NODE_ENV !== 'production' && {
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
      });
    }
  }

  async getQuestions(req: Request, res: Response): Promise<Response> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    try {
      const [questions, total] = await this.questionRepository
        .createQueryBuilder('question')
        .leftJoinAndSelect('question.topic', 'topic')
        .leftJoinAndSelect('question.answers', 'answers')
        .skip(offset)
        .take(limit)
        .getManyAndCount();

      const totalPages = Math.ceil(total / limit);

      return res.json({
        questions,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      console.error('AdminController.getQuestions error:', error);
      return res.status(500).json({
        error: 'Failed to get questions',
        ...(process.env.NODE_ENV !== 'production' && {
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
      });
    }
  }

  async getQuestion(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const question = await this.questionRepository
        .createQueryBuilder('question')
        .leftJoinAndSelect('question.topic', 'topic')
        .leftJoinAndSelect('question.answers', 'answers')
        .where('question.id = :id', { id: parseInt(id as string, 10) })
        .getOne();

      if (!question) {
        return res.status(404).json({ error: 'Вопрос не найден' });
      }

      // Construct the full URL for the image if it's a relative path
      if (question.imageUrl && !question.imageUrl.startsWith('http')) {
        question.imageUrl = `${req.protocol}://${req.get('host')}/uploads/questions/${question.imageUrl}`;
      }

      return res.json(question);
    } catch (error) {
      console.error('AdminController.getQuestion error:', error);
      return res.status(500).json({
        error: 'Failed to get question',
        ...(process.env.NODE_ENV !== 'production' && {
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
      });
    }
  }

  async updateQuestion(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const questionDto = plainToClass(QuestionDto, req.body);

    // Validate the DTO
    const errors = await validate(questionDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Invalid input',
        details: errors.map(e => e.constraints ? Object.values(e.constraints) : []),
      });
    }

    try {
      const question = await this.questionRepository.findOneBy({ id: parseInt(id, 10) });

      if (!question) {
        return res.status(404).json({ error: 'Вопрос не найден' });
      }

      // Update question fields
      question.text = questionDto.text;
      question.topicId = questionDto.topicId;
      question.imageUrl = questionDto.imageUrl ?? null;

      // Update answers
      for (const answerDto of questionDto.answers) {
        let answer = await this.answerRepository.findOneBy({ id: answerDto.id });
        if (answer) {
          // Update existing answer
          answer.text = answerDto.text;
          answer.isCorrect = answerDto.isCorrect;
          await this.answerRepository.save(answer);
        } else {
          // Create new answer
          const newAnswer = this.answerRepository.create({
            ...answerDto,
            question: question,
          });
          await this.answerRepository.save(newAnswer);
        }
      }

      // Remove any answers that were deleted
      const existingAnswerIds = questionDto.answers.map((a: AnswerDto) => a.id);
      const answersToRemove = await this.answerRepository.find({
        where: {
          question: { id: parseInt(id, 10) },
          id: Not(In(existingAnswerIds)),
        },
      });
      await this.answerRepository.remove(answersToRemove);

      await this.questionRepository.save(question);

      return res.json({ success: true, notification: { message: 'Вопрос успешно обновлен', type: 'success' } });
    } catch (error) {
      console.error('AdminController.updateQuestion error:', error);
      return res.status(500).json({
        error: 'Failed to update question',
        ...(process.env.NODE_ENV !== 'production' && {
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
      });
    }
  }

  async deleteQuestion(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const question = await this.questionRepository.findOneBy({ id: parseInt(id, 10) });

      if (!question) {
        return res.status(404).json({ error: 'Вопрос не найден' });
      }

      await this.questionRepository.remove(question);

      return res.json({ success: true, notification: { message: 'Вопрос успешно удален', type: 'success' } });
    } catch (error) {
      console.error('AdminController.deleteQuestion error:', error);
      return res.status(500).json({
        error: 'Failed to delete question',
        ...(process.env.NODE_ENV !== 'production' && {
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
      });
    }
  }
}

export default new AdminController();
