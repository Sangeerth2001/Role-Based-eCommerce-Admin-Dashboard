import { Request, Response } from 'express';
import { Cart, Product } from '../db/index.js';

/**
 * GET /api/cart
 * Get current user's cart items
 */
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'price', 'stock', 'imageUrl', 'description'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Calculate total
    let total = 0;
    const items = cartItems.map((item) => {
      const cartItem = item.toJSON() as any;
      const itemTotal = Number(cartItem.product.price) * cartItem.quantity;
      total += itemTotal;
      return {
        ...cartItem,
        itemTotal,
      };
    });

    res.json({
      success: true,
      data: items,
      total: total.toFixed(2),
      count: items.length,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
    });
  }
};

/**
 * POST /api/cart/add
 * Add item to cart or update quantity if exists
 */
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const { productId, quantity } = req.body;

    if (!productId) {
      res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
      return;
    }

    // Check if product exists and has stock
    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    const requestedQuantity = quantity || 1;

    if (product.stock < requestedQuantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock',
        availableStock: product.stock,
      });
      return;
    }

    // Check if item already exists in cart
    const existingCartItem = await Cart.findOne({
      where: {
        userId: req.user.id,
        productId,
      },
    });

    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + requestedQuantity;

      if (product.stock < newQuantity) {
        res.status(400).json({
          success: false,
          message: 'Insufficient stock for requested quantity',
          availableStock: product.stock,
          currentCartQuantity: existingCartItem.quantity,
        });
        return;
      }

      await existingCartItem.update({ quantity: newQuantity });

      res.json({
        success: true,
        message: 'Cart updated successfully',
        data: existingCartItem,
      });
    } else {
      // Create new cart item
      const cartItem = await Cart.create({
        userId: req.user.id,
        productId,
        quantity: requestedQuantity,
      });

      res.status(201).json({
        success: true,
        message: 'Item added to cart',
        data: cartItem,
      });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
    });
  }
};

/**
 * PUT /api/cart/:id
 * Update cart item quantity
 */
export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
      return;
    }

    const cartItem = await Cart.findOne({
      where: {
        id,
        userId: req.user.id,
      },
      include: [
        {
          model: Product,
          as: 'product',
        },
      ],
    });

    if (!cartItem) {
      res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
      return;
    }

    const product = (cartItem as any).product;

    if (product.stock < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock',
        availableStock: product.stock,
      });
      return;
    }

    await cartItem.update({ quantity });

    res.json({
      success: true,
      message: 'Cart item updated',
      data: cartItem,
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item',
    });
  }
};

/**
 * DELETE /api/cart/:id
 * Remove item from cart
 */
export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const { id } = req.params;

    const cartItem = await Cart.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!cartItem) {
      res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
      return;
    }

    await cartItem.destroy();

    res.json({
      success: true,
      message: 'Item removed from cart',
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
    });
  }
};

/**
 * DELETE /api/cart
 * Clear entire cart
 */
export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    await Cart.destroy({
      where: {
        userId: req.user.id,
      },
    });

    res.json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
    });
  }
};
