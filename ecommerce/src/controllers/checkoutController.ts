import { Request, Response } from 'express';
import { Cart, Product, Order, OrderItem } from '../db/index.js';
import sequelize from '../db/config.js';

/**
 * POST /api/checkout
 * Create order from cart items
 */
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();

  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    // Get user's cart items
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          as: 'product',
        },
      ],
      transaction,
    });

    if (cartItems.length === 0) {
      await transaction.rollback();
      res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
      return;
    }

    // Calculate total and validate stock
    let totalAmount = 0;
    const orderItems: any[] = [];

    for (const cartItem of cartItems) {
      const product = (cartItem as any).product;

      // Check stock availability
      if (product.stock < cartItem.quantity) {
        await transaction.rollback();
        res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
          product: {
            id: product.id,
            name: product.name,
            availableStock: product.stock,
            requestedQuantity: cartItem.quantity,
          },
        });
        return;
      }

      const itemTotal = Number(product.price) * cartItem.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: cartItem.quantity,
        price: product.price,
      });

      // Reduce product stock
      await product.update(
        { stock: product.stock - cartItem.quantity },
        { transaction }
      );
    }

    // Create order
    const order = await Order.create(
      {
        userId: req.user.id,
        totalAmount,
        status: 'pending',
      },
      { transaction }
    );

    // Create order items
    const createdOrderItems = await OrderItem.bulkCreate(
      orderItems.map((item) => ({
        ...item,
        orderId: order.id,
      })),
      { transaction }
    );

    // Clear user's cart
    await Cart.destroy({
      where: { userId: req.user.id },
      transaction,
    });

    await transaction.commit();

    // Fetch complete order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'price', 'image'],
            },
          ],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: completeOrder,
    });
  } catch (error) {
    // Only rollback if transaction hasn't been committed or rolled back
    try {
      await transaction.rollback();
    } catch (rollbackError) {
      // Transaction was already finished (committed or rolled back), ignore the error
      console.log('Transaction already finished, skipping rollback');
    }
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
    });
  }
};
