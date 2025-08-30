import { AppDataSource } from '../config/data-source';
import logger from '../config/logger';
import { TheoryPoint } from '../entities/TheoryPoint';

class TheoryPointService {
  private pointRepo = AppDataSource.getRepository(TheoryPoint);

  async getPoints(): Promise<TheoryPoint[]> {
    try {
      logger.info('Fetching points with rules');
      return await this.pointRepo.find({
        relations: {
          rules: true
        }
      });
    } catch (error) {
      logger.error('Error fetching points:', { error });
      throw error;
    }
  }

  async getPoint(pointId: number): Promise<TheoryPoint | null> {
    try {
      logger.info(`Fetching point with ID: ${pointId}`);
      return await this.pointRepo.findOne({
        where: { id: pointId },
        relations: {
          rules: true
        }
      });
    } catch (error) {
      logger.error(`Error fetching point with ID: ${pointId}`, { error });
      throw error;
    }
  }
}

export default new TheoryPointService();
