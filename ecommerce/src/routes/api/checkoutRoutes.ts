import { Router } from 'express';
import { createOrder } from '../../controllers/checkoutController.js';
import { adminSessionAuth } from '../../middleware/adminSession.js';

const router = Router();

// All checkout routes require authentication (uses AdminJS session)
router.use(adminSessionAuth);

// POST /api/checkout - Create new order
router.post('/', createOrder);

export default router;
