import { Router } from 'express';
import TheoryTopicController from '../controllers/theoryTopic.controller';

const router = Router();

// Роуты для работы с темами
router.get('/', TheoryTopicController.getTopics);
router.get('/:topicId', TheoryTopicController.getTopic);

export default router;
