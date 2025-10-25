import { Router } from 'express';
import { getUserProfile, updateUserProfile, getUserOrders, getUserOrderById } from '../../controllers/userController.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

// All user routes require authentication
router.use(authenticate);

// GET /api/user/profile - Get user profile
router.get('/profile', getUserProfile);

// PUT /api/user/profile - Update profile
router.put('/profile', updateUserProfile);

// GET /api/user/orders - Get user orders
router.get('/orders', getUserOrders);

// GET /api/user/orders/:id - Get order details
router.get('/orders/:id', getUserOrderById);

export default router;
