import { Request, Response, NextFunction } from 'express';

// Extend Express Request to include user property
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
 * Middleware to extract user from AdminJS session
 * This is the ONLY authentication method - no JWT tokens
 */
export const adminSessionAuth = (req: Request, res: Response, next: NextFunction) => {
  const session = (req as any).session;
  const adminUser = session?.adminUser;

  // Debug logging
  console.log('🔍 Session Auth Check:');
  console.log('  - Has session:', !!session);
  console.log('  - Has adminUser:', !!adminUser);
  if (adminUser) {
    console.log('  - User ID:', adminUser.id);
    console.log('  - User Email:', adminUser.email);
    console.log('  - User Role:', adminUser.role);
  }

  if (adminUser) {
    // Add user to request object
    req.user = {
      id: typeof adminUser.id === 'string' ? parseInt(adminUser.id, 10) : adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    };
    console.log('  ✅ User authenticated:', req.user.email);
    next();
  } else {
    console.log('  ❌ Authentication failed - no session');
    res.status(401).json({
      success: false,
      message: 'Not authenticated. Please login via AdminJS at /admin',
    });
  }
};

/**
 * Optional middleware - doesn't require authentication but adds user if available
 */
export const optionalAdminSessionAuth = (req: Request, res: Response, next: NextFunction) => {
  const session = (req as any).session;
  const adminUser = session?.adminUser;

  if (adminUser) {
    req.user = {
      id: typeof adminUser.id === 'string' ? parseInt(adminUser.id, 10) : adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    };
  }
  next();
};

/**
 * RBAC Middleware: Require admin role
 * Use this to protect routes that should only be accessible by admins
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated. Please login first.',
    });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }

  next();
};

/**
 * RBAC Middleware: Require specific role(s)
 * Use this to protect routes that require specific roles
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated. Please login first.',
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}.`,
      });
    }

    next();
  };
};

/**
 * RBAC Middleware: Allow only the user themselves or admins
 * Useful for endpoints where users can access their own data, or admins can access anyone's
 */
export const requireSelfOrAdmin = (userIdParam: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated. Please login first.',
      });
    }

    const targetUserId = req.params[userIdParam] || req.body[userIdParam] || req.query[userIdParam];

    // Allow if user is admin or accessing their own data
    if (user.role === 'admin' || user.id.toString() === targetUserId?.toString()) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only access your own data.',
    });
  };
};
