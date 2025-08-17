import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import logger from '../config/logger';

// Create a custom interface that extends the Express Request interface
interface AuthenticatedRequest extends Request {
  user?: User;
  userRole?: string;
}

export default async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    logger.info(`Auth middleware called for request: ${req.method} ${req.url}`);
    logger.info(`Token received: ${token ? 'present' : 'absent'}`);

    if (!token) {
      logger.warn("Authorization required - no token provided");
      res.status(401).json({ error: "Authorization required" });
      return;
    }

    logger.info("Auth middleware - token received", { token: token ? "token-present" : "no-token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: decoded.id },
      relations: ['emailVerificationTokens', 'resetTokens'] // Добавляем нужные связи
    });

    if (!user) {
      logger.warn("User not found for token", { token });
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = user; // Присваиваем полный объект пользователя
    req.userRole = user.role; // Добавляем роль пользователя в запрос
    logger.info("User authenticated successfully", { userId: user.id, role: user.role });
    next();
  } catch (error) {
    logger.error("Auth middleware error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    res.status(401).json({ error: "Invalid token" });
  }
}
