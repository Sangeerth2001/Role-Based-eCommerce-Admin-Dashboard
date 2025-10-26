import { Router } from 'express';
import { getAllCategories, getCategoryById } from '../../controllers/categoryController.js';

const router = Router();

// GET /api/categories - List all categories
router.get('/', getAllCategories);

// GET /api/categories/:id - Get single category
router.get('/:id', getCategoryById);

export default router;
