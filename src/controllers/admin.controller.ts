import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { TestAttempt } from '../entities/TestAttempt';
import { Topic } from '../entities/Topic';
import { Not, IsNull } from 'typeorm';

class AdminController {
  async getDashboardStats(req: Request, res: Response): Promise<void> {
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

      res.json({
        totalAttempts,
        statusCounts,
        typeCounts,
        topicCounts: topicSessionCounts,
        averageCorrectRate,
      });
    } catch (error) {
      console.error('AdminController.getDashboardStats error:', error);
      res.status(500).json({
        error: 'Failed to get dashboard stats',
        ...(process.env.NODE_ENV !== 'production' && {
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
      });
    }
  }
}

export default new AdminController();
