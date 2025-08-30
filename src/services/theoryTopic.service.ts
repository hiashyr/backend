import { AppDataSource } from '../config/data-source';
import logger from '../config/logger';
import { TheoryTopic } from '../entities/TheoryTopic';

class TheoryTopicService {
  private topicRepo = AppDataSource.getRepository(TheoryTopic);

  async getTopics(): Promise<TheoryTopic[]> {
    try {
      logger.info('Fetching topics with points and rules');
      return await this.topicRepo.find({
        relations: {
          points: {
            rules: true
          }
        }
      });
    } catch (error) {
      logger.error('Error fetching topics:', { error });
      throw error;
    }
  }

  async getTopic(topicId: number): Promise<TheoryTopic | null> {
    try {
      logger.info(`Fetching topic with ID: ${topicId}`);
      return await this.topicRepo.findOne({
        where: { id: topicId },
        relations: {
          points: {
            rules: true
          }
        }
      });
    } catch (error) {
      logger.error(`Error fetching topic with ID: ${topicId}`, { error });
      throw error;
    }
  }
}

export default new TheoryTopicService();
