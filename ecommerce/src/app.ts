import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';

import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import dashboardRoutes from './routes/dashboard.js';
import settingsRoutes from './routes/settings.js';
import productRoutes from './routes/api/productRoutes.js';
import categoryRoutes from './routes/api/categoryRoutes.js';
import cartRoutes from './routes/api/cartRoutes.js';
import userRoutes from './routes/api/userRoutes.js';
import checkoutRoutes from './routes/api/checkoutRoutes.js';
import authRoutes from './routes/api/authRoutes.js';

const port = process.env.PORT || 3000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const start = async () => {
  const app = express();

  await initializeDb();

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  // IMPORTANT: Apply session middleware globally BEFORE AdminJS router
  const sessionMiddleware = session({
    secret: process.env.COOKIE_SECRET || 'fallback-secret-change-this',
    saveUninitialized: true,
    resave: true,
    name: 'adminjs', // Use same cookie name as AdminJS
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Important for session cookies
    },
  });

  app.use(sessionMiddleware);

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET || 'fallback-secret-change-this',
      cookieName: 'adminjs',
      provider,
    },
    null,
    null, // Remove session config here since we're using global session
  );

  // Admin Panel - MUST come before body-parser
  app.use(admin.options.rootPath, router);

  // API endpoint to get current user (for custom navigation logic)
  app.get('/admin/api/getCurrentUser', (req, res) => {
    const session = (req as any).session;
    const currentAdmin = session?.adminUser;

    if (currentAdmin) {
      res.json({
        success: true,
        currentAdmin: {
          id: currentAdmin.id,
          email: currentAdmin.email,
          name: currentAdmin.name,
          role: currentAdmin.role,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }
  });

  // Body parser middleware - MUST come after AdminJS router
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // API Routes
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/settings', settingsRoutes);

  // Authentication routes (JWT-based)
  app.use('/api/auth', authRoutes);

  // User-facing API routes
  app.use('/api/products', productRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/checkout', checkoutRoutes);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
    console.log(`API available at http://localhost:${port}/api`);
  });
};

start();
