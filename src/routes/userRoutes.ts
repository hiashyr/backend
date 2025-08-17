import { Router, Request, Response, NextFunction } from 'express';
import {
  register,
  login,
  getCurrentUser,
  getUsers,
  getAdminStats,
  uploadAvatar as uploadAvatarHandler, // Переименовываем импорт
  changePassword,
  checkEmail
} from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
import { uploadAvatar } from '../config/multer'; // Middleware для загрузки
import { User } from '../entities/User';
import { restrictToUserRole } from '../middlewares/roleMiddleware';

const router = Router();

// Create a custom interface that extends the Express Request interface
interface AuthenticatedRequest extends Request {
  user?: User;
  userRole?: string;
}

const asyncHandler = <T extends Request>(
  fn: (req: T, res: Response, next?: NextFunction) => Promise<Response | void>
) => (req: T, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Public routes
router.post("/check-email", asyncHandler<Request>(checkEmail));
router.post("/register", asyncHandler<Request>(register));
router.post("/login", asyncHandler<Request>(login));

// Authenticated routes
router.get("/me", authMiddleware, restrictToUserRole(['user', 'admin']), asyncHandler<AuthenticatedRequest>(getCurrentUser));
router.post(
  '/change-password',
  authMiddleware,
  restrictToUserRole(['user', 'admin']),
  asyncHandler<AuthenticatedRequest>(changePassword)
);

// Avatar upload - используем переименованный обработчик
router.post(
  '/upload-avatar',
  authMiddleware,
  restrictToUserRole(['user', 'admin']),
  uploadAvatar.single('avatar'),
  asyncHandler<AuthenticatedRequest & { file?: Express.Multer.File }>(uploadAvatarHandler) // Используем новое имя
);

// Admin routes
router.get("/", authMiddleware, restrictToUserRole(['admin']), asyncHandler<AuthenticatedRequest>(getUsers));
router.get(
  "/admin-stats",
  authMiddleware,
  restrictToUserRole(['admin']),
  asyncHandler<AuthenticatedRequest>(getAdminStats)
);

// Add a route to check if a user is an admin
router.get(
  "/is-admin",
  authMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    if (req.user?.role === 'admin') {
      return res.json({ isAdmin: true });
    } else {
      return res.json({ isAdmin: false });
    }
  }
);

export default router;
