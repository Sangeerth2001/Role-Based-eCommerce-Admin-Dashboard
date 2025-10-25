import { Router } from 'express';
import { getAllProducts, getProductById, getProductsByCategory } from '../../controllers/productController.js';

const router = Router();

// GET /api/products - List all products
router.get('/', getAllProducts);

// GET /api/products/category/:categoryId - Products by category
router.get('/category/:categoryId', getProductsByCategory);

// GET /api/products/:id - Get single product
router.get('/:id', getProductById);

export default router;
