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
    console.log('Attempting to connect to database...');
    await sequelize.authenticate();
    console.log('Database connection successful!');

    defineAssociations();
    console.log('Model associations defined');

    await sequelize.sync({ alter: true });
    console.log('Database models synchronized');

    return { sequelize };
  } catch (error) {
    console.error('=================================================');
    console.error('DATABASE CONNECTION FAILED!');
    console.error('Error:', error);
    console.error('=================================================');
    console.error('IMPORTANT: You need to:');
    console.error('1. Create a PostgreSQL database on Render');
    console.error('2. Add DATABASE_URL environment variable');
    console.error('3. Redeploy the service');
    console.error('=================================================');

    return {};
  }
};

// Export models
export { User, Category, Product, Order, OrderItem, Setting, Cart };

export default initialize;
