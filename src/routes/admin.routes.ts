import { Router } from 'express';
import AdminController from '../controllers/admin.controller';
import authMiddleware from '../middlewares/authMiddleware';
import { restrictToUserRole } from '../middlewares/roleMiddleware';

const router = Router();

// Admin dashboard stats
router.get('/dashboard/stats', authMiddleware, restrictToUserRole(['admin']), (req, res, next) => {
  AdminController.getDashboardStats(req, res).catch(next);
});

// Admin questions
router.get('/questions', authMiddleware, restrictToUserRole(['admin']), (req, res, next) => {
  AdminController.getQuestions(req, res).catch(next);
});

export default router;
