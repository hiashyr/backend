import { Request, Response } from 'express';
import logger from '../config/logger';
import TheoryTopicService from '../services/theoryTopic.service';

class TheoryTopicController {
  async getTopics(req: Request, res: Response): Promise<void> {
    try {
      const topics = await TheoryTopicService.getTopics();

      res.status(200).json({
        success: true,
        data: Array.isArray(topics) ? topics : []
      });
    } catch (error) {
      logger.error('Get topics error:', { error });
      res.status(500).json({
        error: 'Failed to get topics',
        details: error instanceof Error ? error.message : undefined
      });
    }
  }

  async getTopic(req: Request, res: Response): Promise<void> {
    try {
      const { topicId } = req.params;
      const parsedTopicId = parseInt(topicId, 10);

      if (isNaN(parsedTopicId)) {
        res.status(400).json({ error: 'Invalid topic ID' });
        return;
      }

      const topic = await TheoryTopicService.getTopic(parsedTopicId);

      if (!topic) {
        res.status(404).json({ error: 'Topic not found' });
        return;
      }

      res.json({
        success: true,
        data: topic
      });
    } catch (error) {
      logger.error('Get topic error:', { error });
      res.status(500).json({
        error: 'Failed to get topic',
        details: error instanceof Error ? error.message : undefined
      });
    }
  }
}

export default new TheoryTopicController();
