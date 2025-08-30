import { Request, Response } from 'express';
import logger from '../config/logger';
import TheoryRuleService from '../services/theoryRule.service';

class TheoryRuleController {
  async getRules(req: Request, res: Response): Promise<void> {
    try {
      const rules = await TheoryRuleService.getRules();

      res.status(200).json({
        success: true,
        data: Array.isArray(rules) ? rules : []
      });
    } catch (error) {
      logger.error('Get rules error:', { error });
      res.status(500).json({
        error: 'Failed to get rules',
        details: error instanceof Error ? error.message : undefined
      });
    }
  }

  async getRule(req: Request, res: Response): Promise<void> {
    try {
      const { ruleId } = req.params;
      const parsedRuleId = parseInt(ruleId, 10);

      if (isNaN(parsedRuleId)) {
        res.status(400).json({ error: 'Invalid rule ID' });
        return;
      }

      const rule = await TheoryRuleService.getRule(parsedRuleId);

      if (!rule) {
        res.status(404).json({ error: 'Rule not found' });
        return;
      }

      res.json({
        success: true,
        data: rule
      });
    } catch (error) {
      logger.error('Get rule error:', { error });
      res.status(500).json({
        error: 'Failed to get rule',
        details: error instanceof Error ? error.message : undefined
      });
    }
  }
}

export default new TheoryRuleController();
