import { Request, Response, NextFunction } from "express";
import logger from '../config/logger';
import { User } from '../entities/User';

// Create a custom interface that extends the Express Request interface
interface AuthenticatedRequest extends Request {
  user?: User;
  userRole?: string;
}

export function restrictToUserRole(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.userRole) {
      logger.error("Role middleware: No role specified", { user: req.user });
      return res.status(403).json({ error: "Access denied: No role specified" });
    }

    // Check if the user has any of the allowed roles
    if (!allowedRoles.includes(req.userRole)) {
      logger.warn("Role middleware: Insufficient permissions", {
        allowedRoles,
        userRole: req.userRole
      });

      // Redirect admin users to dashboard
      if (req.userRole === 'admin') {
        return res.status(302).json({ redirect: '/admin/dashboard' });
      }

      // Redirect other users to home
      return res.status(302).json({ redirect: '/' });
    }

    logger.info("Role middleware: Access granted", {
      userRole: req.userRole,
      allowedRoles
    });
    next();
  };
}
