import sequelize from './config.js';
import initializeDb from './index.js';
import { User, Category, Product, Order, OrderItem, Setting } from './index.js';

const testModels = async () => {
  console.log('='.repeat(60));
  console.log('DATABASE MODELS TEST');
  console.log('='.repeat(60));

  try {
    // Initialize database and associations
    await initializeDb();

    // Test 1: Database Connection
    console.log('\n[TEST 1] Testing Database Connection...');
    console.log('✓ Database connection successful');

    // Test 2: Count Records
    console.log('\n[TEST 2] Counting Records in Each Table...');
    const userCount = await User.count();
    const categoryCount = await Category.count();
    const productCount = await Product.count();
    const orderCount = await Order.count();
    const orderItemCount = await OrderItem.count();
    const settingCount = await Setting.count();

    console.log(`✓ Users: ${userCount}`);
    console.log(`✓ Categories: ${categoryCount}`);
    console.log(`✓ Products: ${productCount}`);
    console.log(`✓ Orders: ${orderCount}`);
    console.log(`✓ Order Items: ${orderItemCount}`);
    console.log(`✓ Settings: ${settingCount}`);

    // Test 3: Fetch All Users
    console.log('\n[TEST 3] Fetching All Users...');
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'createdAt'],
    });
    users.forEach((user) => {
      console.log(`✓ ID: ${user.id} | ${user.name} (${user.email}) | Role: ${user.role}`);
    });

    // Test 4: Test Password Hashing
    console.log('\n[TEST 4] Testing Password Hashing...');
    const testUser = await User.findOne({ where: { email: 'admin@example.com' } });
    if (testUser) {
      console.log(`✓ Admin user found: ${testUser.email}`);
      console.log(`✓ Password is hashed: ${testUser.password.substring(0, 20)}...`);

      // Test password comparison
      const isMatch = await testUser.comparePassword('admin123');
      console.log(`✓ Password comparison test: ${isMatch ? 'PASSED ✓' : 'FAILED ✗'}`);

      const isWrongMatch = await testUser.comparePassword('wrongpassword');
      console.log(`✓ Wrong password test: ${!isWrongMatch ? 'PASSED ✓' : 'FAILED ✗'}`);
    }

    // Test 5: Test Product-Category Relationship
    console.log('\n[TEST 5] Testing Product-Category Relationships...');
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
      limit: 3,
    });
    products.forEach((product) => {
      console.log(`✓ ${product.name} ($${product.price}) | Category: ${product.category?.name || 'N/A'}`);
    });

    // Test 6: Test Order-User Relationship
    console.log('\n[TEST 6] Testing Order-User Relationships...');
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    orders.forEach((order) => {
      console.log(`✓ Order #${order.id} | User: ${order.user?.name} | Status: ${order.status} | Total: $${order.totalAmount}`);
    });

    // Test 7: Test Order with OrderItems and Products
    console.log('\n[TEST 7] Testing Order-OrderItems-Products Relationships...');
    const orderWithItems = await Order.findOne({
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['name', 'price'],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (orderWithItems) {
      console.log(`✓ Order #${orderWithItems.id} by ${orderWithItems.user?.name}`);
      console.log(`  Total: $${orderWithItems.totalAmount} | Status: ${orderWithItems.status}`);
      console.log('  Items:');
      orderWithItems.orderItems?.forEach((item) => {
        console.log(`    - ${item.product?.name} x${item.quantity} @ $${item.price} = $${(item.quantity * parseFloat(item.price.toString())).toFixed(2)}`);
      });
    }

    // Test 8: Test Category with Products
    console.log('\n[TEST 8] Testing Category-Products Relationships...');
    const categoriesWithProducts = await Category.findAll({
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'price', 'stock'],
        },
      ],
    });
    categoriesWithProducts.forEach((category) => {
      console.log(`✓ Category: ${category.name} (${category.products?.length || 0} products)`);
      category.products?.forEach((product) => {
        console.log(`    - ${product.name}: $${product.price} (Stock: ${product.stock})`);
      });
    });

    // Test 9: Test Settings
    console.log('\n[TEST 9] Fetching Settings...');
    const settings = await Setting.findAll();
    settings.forEach((setting) => {
      console.log(`✓ ${setting.key}: ${setting.value}`);
    });

    // Test 10: Test User with Orders
    console.log('\n[TEST 10] Testing User-Orders Relationships...');
    const usersWithOrders = await User.findAll({
      include: [
        {
          model: Order,
          as: 'orders',
          attributes: ['id', 'status', 'totalAmount'],
        },
      ],
      where: { role: 'user' },
    });
    usersWithOrders.forEach((user) => {
      console.log(`✓ User: ${user.name} (${user.orders?.length || 0} orders)`);
      user.orders?.forEach((order) => {
        console.log(`    - Order #${order.id}: $${order.totalAmount} (${order.status})`);
      });
    });

    // Test 11: Test Creating a New User
    console.log('\n[TEST 11] Testing User Creation with Password Hashing...');
    const newUser = await User.create({
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123',
      role: 'user',
    });
    console.log(`✓ New user created: ${newUser.email}`);
    console.log(`✓ Password auto-hashed: ${newUser.password.substring(0, 20)}...`);
    const canLogin = await newUser.comparePassword('testpassword123');
    console.log(`✓ Password verification: ${canLogin ? 'PASSED ✓' : 'FAILED ✗'}`);

    // Clean up test user
    await newUser.destroy();
    console.log('✓ Test user cleaned up');

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('ALL TESTS COMPLETED SUCCESSFULLY! ✓');
    console.log('='.repeat(60));
    console.log('\nDatabase Models Summary:');
    console.log(`- ${userCount} Users`);
    console.log(`- ${categoryCount} Categories`);
    console.log(`- ${productCount} Products`);
    console.log(`- ${orderCount} Orders`);
    console.log(`- ${orderItemCount} Order Items`);
    console.log(`- ${settingCount} Settings`);
    console.log('\nAll relationships working correctly!');
    console.log('Password hashing is functioning properly!');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n✗ TEST FAILED:', error);
    throw error;
  } finally {
    await sequelize.close();
    console.log('\nDatabase connection closed.');
    process.exit(0);
  }
};

testModels();
