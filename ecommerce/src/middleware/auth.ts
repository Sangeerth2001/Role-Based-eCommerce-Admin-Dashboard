import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../db/index.js';

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: 'admin' | 'user';
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No token provided. Please provide a valid token.',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      role: 'admin' | 'user';
    };

    // Verify user still exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User no longer exists',
      });
      return;
    }

    // Attach user to request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
      return;
    }
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message,
    });
  }
};

// Middleware to check if user is admin
export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
    return;
  }

  next();
};

// Middleware to check if user is accessing their own resource or is admin
export const isOwnerOrAdmin = (resourceUserIdParam: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    const resourceUserId = parseInt(req.params[resourceUserIdParam], 10);

    // Allow if user is admin or accessing their own resource
    if (req.user.role === 'admin' || req.user.id === resourceUserId) {
      next();
      return;
    }

    res.status(403).json({
      success: false,
      message: 'Access denied. You can only access your own resources.',
    });
  };
};
