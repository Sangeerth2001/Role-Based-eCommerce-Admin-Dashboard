import sequelize from '../config.js';
import { User, Category, Product, Order, OrderItem, Setting } from '../index.js';

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data (optional - remove in production)
    await OrderItem.destroy({ where: {}, truncate: true, cascade: true });
    await Order.destroy({ where: {}, truncate: true, cascade: true });
    await Product.destroy({ where: {}, truncate: true, cascade: true });
    await Category.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });
    await Setting.destroy({ where: {}, truncate: true, cascade: true });

    console.log('Cleared existing data');

    // Create Users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123', // Will be hashed automatically
      role: 'admin',
    });

    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'user123', // Will be hashed automatically
      role: 'user',
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'user123', // Will be hashed automatically
      role: 'user',
    });

    console.log('Users created');

    // Create Categories
    const electronics = await Category.create({
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
    });

    const clothing = await Category.create({
      name: 'Clothing',
      description: 'Fashion and apparel',
    });

    const books = await Category.create({
      name: 'Books',
      description: 'Books and literature',
    });

    console.log('Categories created');

    // Create Products
    const laptop = await Product.create({
      name: 'MacBook Pro',
      description: '16-inch laptop with M3 chip',
      price: 2499.99,
      stock: 15,
      categoryId: electronics.id,
      image: 'https://example.com/macbook.jpg',
    });

    const phone = await Product.create({
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with A17 chip',
      price: 999.99,
      stock: 30,
      categoryId: electronics.id,
      image: 'https://example.com/iphone.jpg',
    });

    const tshirt = await Product.create({
      name: 'Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt',
      price: 19.99,
      stock: 100,
      categoryId: clothing.id,
      image: 'https://example.com/tshirt.jpg',
    });

    const jeans = await Product.create({
      name: 'Blue Jeans',
      description: 'Classic blue denim jeans',
      price: 49.99,
      stock: 50,
      categoryId: clothing.id,
      image: 'https://example.com/jeans.jpg',
    });

    const book1 = await Product.create({
      name: 'The Great Gatsby',
      description: 'Classic American novel',
      price: 12.99,
      stock: 75,
      categoryId: books.id,
      image: 'https://example.com/gatsby.jpg',
    });

    console.log('Products created');

    // Create Orders
    const order1 = await Order.create({
      userId: user1.id,
      status: 'delivered',
      totalAmount: 3019.97,
    });

    const order2 = await Order.create({
      userId: user2.id,
      status: 'processing',
      totalAmount: 69.98,
    });

    const order3 = await Order.create({
      userId: user1.id,
      status: 'pending',
      totalAmount: 999.99,
    });

    console.log('Orders created');

    // Create Order Items
    await OrderItem.create({
      orderId: order1.id,
      productId: laptop.id,
      quantity: 1,
      price: 2499.99,
    });

    await OrderItem.create({
      orderId: order1.id,
      productId: tshirt.id,
      quantity: 2,
      price: 19.99,
    });

    await OrderItem.create({
      orderId: order1.id,
      productId: book1.id,
      quantity: 40,
      price: 12.99,
    });

    await OrderItem.create({
      orderId: order2.id,
      productId: tshirt.id,
      quantity: 1,
      price: 19.99,
    });

    await OrderItem.create({
      orderId: order2.id,
      productId: jeans.id,
      quantity: 1,
      price: 49.99,
    });

    await OrderItem.create({
      orderId: order3.id,
      productId: phone.id,
      quantity: 1,
      price: 999.99,
    });

    console.log('Order items created');

    // Create Settings
    await Setting.create({
      key: 'site_name',
      value: 'My eCommerce Store',
      description: 'The name of the eCommerce site',
    });

    await Setting.create({
      key: 'currency',
      value: 'USD',
      description: 'Default currency for the store',
    });

    await Setting.create({
      key: 'tax_rate',
      value: '0.08',
      description: 'Tax rate percentage (8%)',
    });

    await Setting.create({
      key: 'shipping_fee',
      value: '9.99',
      description: 'Standard shipping fee',
    });

    console.log('Settings created');

    console.log('Database seeding completed successfully!');
    console.log('\nSummary:');
    console.log('- 3 Users (1 admin, 2 regular users)');
    console.log('- 3 Categories');
    console.log('- 5 Products');
    console.log('- 3 Orders');
    console.log('- 6 Order Items');
    console.log('- 4 Settings');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User 1: john@example.com / user123');
    console.log('User 2: jane@example.com / user123');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
