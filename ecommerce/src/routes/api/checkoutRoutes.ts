import { Router } from 'express';
import { createOrder } from '../../controllers/checkoutController.js';
import { authenticate } from '../../middleware/auth.js';

const router = Router();

// All checkout routes require authentication
router.use(authenticate);

// POST /api/checkout - Create new order
router.post('/', createOrder);

export default router;
