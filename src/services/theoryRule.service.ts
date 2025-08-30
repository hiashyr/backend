import { AppDataSource } from '../config/data-source';
import logger from '../config/logger';
import { TheoryRule } from '../entities/TheoryRule';

class TheoryRuleService {
  private ruleRepo = AppDataSource.getRepository(TheoryRule);

  async getRules(): Promise<TheoryRule[]> {
    try {
      logger.info('Fetching rules with points');
      return await this.ruleRepo.find({
        relations: {
          point: true
        }
      });
    } catch (error) {
      logger.error('Error fetching rules:', { error });
      throw error;
    }
  }

  async getRule(ruleId: number): Promise<TheoryRule | null> {
    try {
      logger.info(`Fetching rule with ID: ${ruleId}`);
      return await this.ruleRepo.findOne({
        where: { id: ruleId },
        relations: {
          point: true
        }
      });
    } catch (error) {
      logger.error(`Error fetching rule with ID: ${ruleId}`, { error });
      throw error;
    }
  }
}

export default new TheoryRuleService();
