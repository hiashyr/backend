import { AppDataSource } from '../config/data-source';
import { TestAttempt } from '../entities/TestAttempt';
import { User } from '../entities/User';
import { Question } from '../entities/Question';
import { Answer } from '../entities/Answer';
import { UserAnswer } from '../entities/UserAnswer';

interface HardModeStats {
    totalQuestions: number;
    correctAnswers: number;
    totalAttempts: number;
    questionsPerAttempt: number;
}

class HardModeService {
    private attemptRepo = AppDataSource.getRepository(TestAttempt);
    private questionRepo = AppDataSource.getRepository(Question);
    private answerRepo = AppDataSource.getRepository(Answer);
    private userAnswerRepo = AppDataSource.getRepository(UserAnswer);

    async getStats(userId: number): Promise<HardModeStats> {
        // Получаем общее количество сложных вопросов
        const totalQuestions = await this.questionRepo.count({
            where: { isHard: true }
        });

        // Получаем статистику по попыткам
        const attempts = await this.attemptRepo.find({
            where: {
                user: { id: userId },
                testType: 'hard'
            },
            relations: ['userAnswers', 'userAnswers.answer']
        });

        const totalAttempts = attempts.length;
        let correctAnswers = 0;

        // Подсчитываем правильные ответы
        attempts.forEach(attempt => {
            attempt.userAnswers.forEach(userAnswer => {
                if (userAnswer.answer.isCorrect) {
                    correctAnswers++;
                }
            });
        });

        return {
            totalQuestions,
            correctAnswers,
            totalAttempts,
            questionsPerAttempt: totalQuestions // Теперь это динамическое значение
        };
    }

    async startTest(userId: number) {
        // Получаем все сложные вопросы
        const questions = await this.questionRepo
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.answers', 'answers')
            .where('question.isHard = :isHard', { isHard: true })
            .orderBy('RANDOM()') // Randomize question order
            .getMany();

        if (questions.length === 0) {
            throw new Error('Нет доступных сложных вопросов');
        }

        // Создаем новую попытку
        const attempt = new TestAttempt();
        attempt.user = { id: userId } as User;
        attempt.testType = 'hard';
        attempt.status = 'in_progress';
        attempt.totalQuestions = questions.length;
        attempt.baseQuestionsCount = questions.length;
        attempt.startedAt = new Date();
        
        const savedAttempt = await this.attemptRepo.save(attempt);

        const baseUrl = process.env.API_URL;
        const defaultImage = `/api/uploads/questions/default-question.jpg`;

        // Время в секундах: 1 минута на вопрос
        const timeLimit = questions.length * 60;

        return {
            attemptId: savedAttempt.id,
            questions: questions.map(q => ({
                id: q.id,
                text: q.text,
                imageUrl: q.imageUrl ? `/api/uploads/questions/${q.imageUrl}` : defaultImage,
                answers: q.answers.map(a => ({ id: a.id, text: a.text }))
            })),
            timeLimit,
            progress: {
                answered: 0,
                total: questions.length
            }
        };
    }

    async getAttempt(attemptId: number, userId: number) {
        const attempt = await this.attemptRepo.findOne({
            where: { 
                id: attemptId, 
                user: { id: userId },
                testType: 'hard'
            },
            relations: ['userAnswers']
        });

        if (!attempt) {
            throw new Error('Попытка не найдена');
        }

        if (!attempt.startedAt) {
            throw new Error('Некорректное состояние попытки: отсутствует время начала');
        }

        // Get all hard questions that haven't been answered yet in this attempt
        const questions = await this.questionRepo
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.answers', 'answers')
            .where('question.isHard = :isHard', { isHard: true })
            .andWhere((qb) => {
                const subQuery = qb
                    .subQuery()
                    .select('ua.question_id')
                    .from(UserAnswer, 'ua')
                    .where('ua.attempt_id = :attemptId')
                    .getQuery();
                return 'question.id NOT IN ' + subQuery;
            })
            .setParameter('isHard', true)
            .setParameter('attemptId', attemptId)
            .getMany();

        const baseUrl = process.env.API_URL;
        const defaultImage = `/api/uploads/questions/default-question.jpg`;

        // Время в секундах: 1 минута на вопрос
        const timeLimit = attempt.totalQuestions * 60;
        const timeElapsed = Math.floor((Date.now() - attempt.startedAt.getTime()) / 1000);
        const timeLeft = Math.max(0, timeLimit - timeElapsed);

        return {
            attemptId: attempt.id,
            questions: questions.map(q => ({
                id: q.id,
                text: q.text,
                imageUrl: q.imageUrl ? `/api/uploads/questions/${q.imageUrl}` : defaultImage,
                answers: q.answers.map(a => ({ id: a.id, text: a.text }))
            })),
            progress: {
                answered: attempt.userAnswers.length,
                total: attempt.totalQuestions
            },
            timeLeft
        };
    }

    async submitAnswer(
        attemptId: number,
        questionId: number,
        answerId: number,
        userId: number
    ) {
        const attempt = await this.attemptRepo.findOne({
            where: { 
                id: attemptId, 
                user: { id: userId },
                testType: 'hard'
            },
            relations: ['userAnswers', 'userAnswers.question', 'userAnswers.answer']
        });

        if (!attempt) {
            throw new Error('Попытка не найдена');
        }

        if (!attempt.startedAt) {
            throw new Error('Некорректное состояние попытки: отсутствует время начала');
        }

        if (attempt.status !== 'in_progress') {
            throw new Error('Тест уже завершен');
        }

        // Проверяем, не истекло ли время (1 минута на вопрос)
        const timeLimit = attempt.totalQuestions * 60;
        const timeElapsed = Math.floor((Date.now() - attempt.startedAt.getTime()) / 1000);
        if (timeElapsed > timeLimit) {
            attempt.status = 'failed';
            await this.attemptRepo.save(attempt);
            throw new Error('Время тестирования истекло');
        }

        // Проверяем, не был ли уже дан ответ на этот вопрос
        const existingAnswer = attempt.userAnswers.find(
            ua => ua.question && ua.question.id === questionId
        );

        if (existingAnswer) {
            throw new Error('На этот вопрос уже дан ответ');
        }

        // Получаем информацию о выбранном ответе и вопросе
        const answer = await this.answerRepo.findOne({
            where: { id: answerId },
            relations: ['question']
        });

        if (!answer) {
            throw new Error('Ответ не найден');
        }

        // Проверяем, что ответ относится к правильному вопросу
        if (answer.question.id !== questionId) {
            throw new Error('Ответ не соответствует вопросу');
        }

        // Создаем новый ответ пользователя
        const userAnswer = new UserAnswer();
        userAnswer.attempt = attempt;
        userAnswer.question = { id: questionId } as Question;
        userAnswer.answer = { id: answerId } as Answer;
        await this.userAnswerRepo.save(userAnswer);

        // Если это был последний вопрос, завершаем попытку
        if (attempt.userAnswers.length + 1 === attempt.totalQuestions) {
            // Подсчитываем количество правильных и неправильных ответов
            const answers = await this.userAnswerRepo.find({
                where: { attempt: { id: attemptId } },
                relations: ['answer']
            });

            const correctAnswers = answers.filter(ua => ua.answer.isCorrect).length;
            const incorrectAnswers = answers.length - correctAnswers;

            // В режиме сложных вопросов тест считается пройденным только если все ответы правильные
            const allAnswersCorrect = correctAnswers === attempt.totalQuestions;
            attempt.status = allAnswersCorrect ? 'passed' : 'failed';
            attempt.completedAt = new Date();
            attempt.correctAnswers = correctAnswers;
            attempt.incorrectAnswers = incorrectAnswers;
            attempt.timeSpentSeconds = Math.floor((attempt.completedAt.getTime() - attempt.startedAt.getTime()) / 1000);
            await this.attemptRepo.save(attempt);

            return {
                success: true,
                isCompleted: true,
                status: attempt.status
            };
        }

        return {
            success: true,
            isCompleted: false
        };
    }

    async getResults(attemptId: number, userId: number) {
        const attempt = await this.attemptRepo.findOne({
            where: { 
                id: attemptId, 
                user: { id: userId },
                testType: 'hard'
            },
            relations: ['userAnswers', 'userAnswers.question', 'userAnswers.answer']
        });

        if (!attempt) {
            throw new Error('Попытка не найдена');
        }

        if (!attempt.startedAt) {
            throw new Error('Некорректное состояние попытки: отсутствует время начала');
        }

        // Если тест еще не завершен и не истекло время, проверяем время
        if (attempt.status === 'in_progress') {
            const timeLimit = attempt.totalQuestions * 60;
            const timeElapsed = Math.floor((Date.now() - attempt.startedAt.getTime()) / 1000);
            if (timeElapsed > timeLimit) {
                // При истечении времени тест считается проваленным
                attempt.status = 'failed';
                attempt.completedAt = new Date();

                // Подсчитываем результаты при истечении времени
                const correctAnswers = attempt.userAnswers.filter(ua => ua.answer.isCorrect).length;
                attempt.correctAnswers = correctAnswers;
                attempt.incorrectAnswers = attempt.userAnswers.length - correctAnswers;

                await this.attemptRepo.save(attempt);
            } else {
                throw new Error('Тест еще не завершен');
            }
        }

        // Подсчитываем результаты
        const results = await Promise.all(attempt.userAnswers.map(async (userAnswer) => {
            const question = await this.questionRepo.findOne({
                where: { id: userAnswer.question.id },
                relations: ['answers']
            });

            const correctAnswer = question?.answers.find(a => a.isCorrect);
            const isCorrect = userAnswer.answer.isCorrect;

            return {
                questionText: question?.text || '',
                userAnswerText: userAnswer.answer.text,
                correctAnswerText: correctAnswer?.text || '',
                isCorrect
            };
        }));

        const timeSpent = Math.min(
            attempt.totalQuestions * 60,
            Math.floor((
                (attempt.completedAt || new Date()).getTime() - 
                attempt.startedAt.getTime()
            ) / 1000)
        );

        // Проверяем, все ли ответы правильные для определения статуса
        const allAnswersCorrect = attempt.correctAnswers === attempt.totalQuestions;
        const finalStatus = allAnswersCorrect ? 'passed' : 'failed';

        return {
            status: finalStatus,
            correctAnswers: attempt.correctAnswers || 0,
            incorrectAnswers: attempt.incorrectAnswers || 0,
            timeSpent,
            results
        };
    }
}

export default new HardModeService(); 