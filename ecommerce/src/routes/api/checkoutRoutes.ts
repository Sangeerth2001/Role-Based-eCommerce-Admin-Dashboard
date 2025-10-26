import { Router } from 'express';
import { createOrder } from '../../controllers/checkoutController.js';
import { authenticateHybrid } from '../../middleware/jwtAuth.js';

const router = Router();

// All checkout routes require authentication (accepts session OR JWT)
router.use(authenticateHybrid);

// POST /api/checkout - Create new order
router.post('/', createOrder);

export default router;
