import { Database, Resource } from '@adminjs/sequelize';
import AdminJS from 'adminjs';

import sequelize from './config.js';
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import OrderItem from './models/OrderItem.js';
import Setting from './models/Setting.js';
import Cart from './models/Cart.js';

AdminJS.registerAdapter({
  Database,
  Resource,
});

// Define model relationships
const defineAssociations = () => {
  // Product belongs to Category
  Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category',
  });

  // Category has many Products
  Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products',
  });

  // Order belongs to User
  Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  // User has many Orders
  User.hasMany(Order, {
    foreignKey: 'userId',
    as: 'orders',
  });

  // OrderItem belongs to Order
  OrderItem.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order',
  });

  // Order has many OrderItems
  Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    as: 'orderItems',
  });

  // OrderItem belongs to Product
  OrderItem.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
  });

  // Product has many OrderItems
  Product.hasMany(OrderItem, {
    foreignKey: 'productId',
    as: 'orderItems',
  });

  // Cart belongs to User
  Cart.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });

  // User has many Carts
  User.hasMany(Cart, {
    foreignKey: 'userId',
    as: 'carts',
  });

  // Cart belongs to Product
  Cart.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
  });

  // Product has many Carts
  Product.hasMany(Cart, {
    foreignKey: 'productId',
    as: 'carts',
  });
};

const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Define associations
    defineAssociations();

    // Sync all models with database (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    return { sequelize };
  } catch (error) {
    console.error('Unable to connect to the database:', error);

    return {};
  }
};

// Export models
export { User, Category, Product, Order, OrderItem, Setting, Cart };

export default initialize;
