import { Request, Response } from 'express';
import { Category, Product } from '../db/index.js';

/**
 * GET /api/categories
 * Get all categories
 */
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { includeProducts } = req.query;

    const categories = await Category.findAll({
      include: includeProducts === 'true'
        ? [
            {
              model: Product,
              as: 'products',
              attributes: ['id', 'name', 'price', 'stock', 'imageUrl'],
            },
          ]
        : undefined,
      order: [['name', 'ASC']],
    });

    res.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
    });
  }
};

/**
 * GET /api/categories/:id
 * Get single category by ID
 */
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'price', 'stock', 'imageUrl', 'description'],
        },
      ],
    });

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category',
    });
  }
};
