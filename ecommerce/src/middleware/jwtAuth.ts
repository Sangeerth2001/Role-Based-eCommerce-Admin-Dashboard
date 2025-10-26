import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// JWT Secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-jwt-secret-change-this-in-production';

/**
 * Interface for JWT payload
 */
interface JWTPayload {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  iat?: number;
  exp?: number;
}

/**
 * Extend Express Request to include user property
 * This is already declared in adminSession.ts, but we're ensuring it's available
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
        role: 'admin' | 'user';
      };
    }
  }
}

/**
 * Middleware to verify JWT token
 * Expects token in Authorization header as: Bearer <token>
 */
export const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: 'No authorization header provided',
      });
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Invalid authorization header format. Use: Bearer <token>',
      });
      return;
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'No token provided',
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    // Attach user to request
    req.user = {
      id: parseInt(decoded.id, 10),
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };

    console.log('✅ JWT verified for user:', req.user.email);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
      return;
    }

    console.error('JWT verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying token',
    });
  }
};

/**
 * Middleware to check if user has admin role
 * Must be used after verifyJWT or adminSessionAuth
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
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
      message: 'Admin access required',
    });
    return;
  }

  next();
};

/**
 * Hybrid middleware: Accepts EITHER session OR JWT authentication
 * Checks session first, then falls back to JWT
 * This allows the same API endpoints to work with both authentication methods
 */
export const authenticateHybrid = (req: Request, res: Response, next: NextFunction): void => {
  // Check session first (AdminJS session)
  const session = (req as any).session;

  // Debug logging
  console.log('🔍 Session check:', {
    hasSession: !!session,
    sessionKeys: session ? Object.keys(session) : [],
    adminUser: session?.adminUser,
    cookies: req.headers.cookie,
  });

  const adminUser = session?.adminUser;

  if (adminUser) {
    // Session authentication successful
    req.user = {
      id: typeof adminUser.id === 'string' ? parseInt(adminUser.id, 10) : adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    };
    console.log('✅ Session auth for user:', req.user.email);
    return next();
  }

  // No session, try JWT authentication
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No valid authentication found');
    res.status(401).json({
      success: false,
      message: 'Authentication required. Please login via /admin or provide JWT token',
      debug: {
        hasSession: !!session,
        hasAuthHeader: !!authHeader,
      },
    });
    return;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    req.user = {
      id: parseInt(decoded.id, 10),
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };

    console.log('✅ JWT auth for user:', req.user.email);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Authentication error',
    });
  }
};

/**
 * Optional authentication middleware
 * Attaches user if authenticated, but doesn't require it
 * Useful for endpoints that have different behavior for authenticated/unauthenticated users
 */
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  // Try session first
  const session = (req as any).session;
  const adminUser = session?.adminUser;

  if (adminUser) {
    req.user = {
      id: typeof adminUser.id === 'string' ? parseInt(adminUser.id, 10) : adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    };
    return next();
  }

  // Try JWT
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

      req.user = {
        id: parseInt(decoded.id, 10),
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      };
    } catch (error) {
      // Invalid token, but that's okay for optional auth
      // Just continue without user
    }
  }

  // Continue even if no authentication
  next();
};
