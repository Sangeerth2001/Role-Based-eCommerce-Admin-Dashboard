import { Router, Request, Response } from 'express';
import { User, Order, Product } from '../db/index.js';
import { Op } from 'sequelize';

const router = Router();

/**
 * GET /api/dashboard/stats
 * Get dashboard statistics for admin panel
 */
router.get('/stats', async (req: Request, res: Response): Promise<void> => {
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

export default router;
