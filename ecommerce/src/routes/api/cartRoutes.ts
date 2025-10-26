import { Router } from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../../controllers/cartController.js';
import { adminSessionAuth } from '../../middleware/adminSession.js';

const router = Router();

// All cart routes require authentication (uses AdminJS session)
router.use(adminSessionAuth);

// GET /api/cart - Get cart items
router.get('/', getCart);

// POST /api/cart/add - Add to cart
router.post('/add', addToCart);

// PUT /api/cart/:id - Update cart item
router.put('/:id', updateCartItem);

// DELETE /api/cart/:id - Remove from cart
router.delete('/:id', removeFromCart);

// DELETE /api/cart - Clear entire cart
router.delete('/', clearCart);

export default router;
