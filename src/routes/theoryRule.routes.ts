import { Router } from 'express';
import TheoryRuleController from '../controllers/theoryRule.controller';

const router = Router();

// Роуты для работы с правилами
router.get('/', TheoryRuleController.getRules);
router.get('/:ruleId', TheoryRuleController.getRule);

export default router;
