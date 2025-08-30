import { Router } from 'express';
import TheoryPointController from '../controllers/theoryPoint.controller';

const router = Router();

// Роуты для работы с пунктами
router.get('/', TheoryPointController.getPoints);
router.get('/:pointId', TheoryPointController.getPoint);

export default router;
