import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Product, Category } from '../db/index.js';

/**
 * GET /api/products
 * Get all products with optional filtering
 */
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, search, minPrice, maxPrice, inStock } = req.query;

    const where: any = {};

    // Filter by category
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Search by name or description
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filter by price range
    if (minPrice) {
      where.price = { ...where.price, [Op.gte]: minPrice };
    }
    if (maxPrice) {
      where.price = { ...where.price, [Op.lte]: maxPrice };
    }

    // Filter by stock availability
    if (inStock === 'true') {
      where.stock = { [Op.gt]: 0 };
    }

    const products = await Product.findAll({
      where,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
    });
  }
};

/**
 * GET /api/products/:id
 * Get single product by ID
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'description'],
        },
      ],
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
    });
  }
};

/**
 * GET /api/products/category/:categoryId
 * Get products by category
 */
export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }

    const products = await Product.findAll({
      where: { categoryId },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
      order: [['name', 'ASC']],
    });

    res.json({
      success: true,
      data: products,
      category: category.toJSON(),
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
    });
  }
};
