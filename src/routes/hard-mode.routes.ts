import { Router } from 'express';
import HardModeController from '../controllers/hard-mode.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Применяем authMiddleware ко всем роутам
router.use(authMiddleware);

// Роуты для режима сложных вопросов
router.get('/stats', HardModeController.getStats);
router.post('/start', HardModeController.startTest);
router.get('/attempt/:attemptId', HardModeController.getAttempt);
router.post('/attempt/:attemptId/answer', HardModeController.submitAnswer);
router.get('/attempt/:attemptId/results', HardModeController.getResults);

export default router; 