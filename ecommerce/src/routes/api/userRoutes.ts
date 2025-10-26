import { Router } from 'express';
import { getUserProfile, updateUserProfile, getUserOrders, getUserOrderById } from '../../controllers/userController.js';
import { authenticateHybrid } from '../../middleware/jwtAuth.js';

const router = Router();

// All user routes require authentication (accepts session OR JWT)
router.use(authenticateHybrid);

// GET /api/user/profile - Get user profile
router.get('/profile', getUserProfile);

// PUT /api/user/profile - Update profile
router.put('/profile', updateUserProfile);

// GET /api/user/orders - Get user orders
router.get('/orders', getUserOrders);

// GET /api/user/orders/:id - Get order details
router.get('/orders/:id', getUserOrderById);

export default router;
