import { Router, Request, Response } from 'express';
import { User, Order, Product } from '../db/index.js';
import { Op } from 'sequelize';
import { adminSessionAuth, requireAdmin } from '../middleware/adminSession.js';

const router = Router();

/**
 * GET /api/dashboard/stats
 * Get dashboard statistics for admin panel
 * RBAC: Admin only
 */
router.get('/stats', adminSessionAuth, requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    // Get total users count
    const totalUsers = await User.count();

    // Get total orders count
    const totalOrders = await Order.count();

    // Calculate total revenue (sum of all order totalAmount)
    const revenueResult = await Order.sum('totalAmount');
    const totalRevenue = revenueResult || 0;

    // Get recent orders (last 10)
    const recentOrders = await Order.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'userId', 'status', 'totalAmount', 'createdAt'],
    });

    // Get low stock products (stock < 10)
    const lowStockProducts = await Product.findAll({
      where: {
        stock: {
          [Op.lt]: 10,
        },
      },
      order: [['stock', 'ASC']],
      attributes: ['id', 'name', 'stock', 'price'],
      limit: 10,
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalRevenue,
        recentOrders: recentOrders.map((order) => order.toJSON()),
        lowStockProducts: lowStockProducts.map((product) => product.toJSON()),
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
    });
  }
});

/**
 * GET /api/dashboard/user-stats
 * Get dashboard statistics for regular users
 * RBAC: User can view their own stats, admin can view anyone's stats
 */
router.get('/user-stats', adminSessionAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const currentUser = (req as any).user;

    // Get userId from query parameter (passed from frontend)
    const userIdParam = req.query.userId as string;

    let userId: number | undefined;

    if (userIdParam) {
      userId = parseInt(userIdParam, 10);
    } else {
      // Fallback: use current user's ID
      userId = currentUser?.id;

      if (typeof userId === 'string') {
        userId = parseInt(userId, 10);
      }
    }

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated. Please provide userId.',
      });
      return;
    }

    // RBAC: Users can only view their own stats, admins can view anyone's
    if (currentUser.role !== 'admin' && currentUser.id !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own statistics.',
      });
      return;
    }

    // Get user's total orders
    const totalOrders = await Order.count({
      where: { userId },
    });

    // Get pending orders
    const pendingOrders = await Order.count({
      where: {
        userId,
        status: {
          [Op.in]: ['pending', 'processing'],
        },
      },
    });

    // Get completed orders
    const completedOrders = await Order.count({
      where: {
        userId,
        status: 'delivered',
      },
    });

    // Calculate total spent
    const spentResult = await Order.sum('totalAmount', {
      where: { userId },
    });
    const totalSpent = spentResult || 0;

    // Get recent orders (last 5)
    const recentOrders = await Order.findAll({
      where: { userId },
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'status', 'totalAmount', 'createdAt'],
    });

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        completedOrders,
        totalSpent,
        recentOrders: recentOrders.map((order) => order.toJSON()),
      },
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
    });
  }
});

export default router;
