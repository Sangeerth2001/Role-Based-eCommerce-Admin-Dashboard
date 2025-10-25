import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';

import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import settingsRoutes from './routes/settings.js';

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

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    },
  );

  // Admin Panel - MUST come before body-parser
  app.use(admin.options.rootPath, router);

  // Body parser middleware - MUST come after AdminJS router
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files (signup page)
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // Signup page route
  app.get('/signup', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/settings', settingsRoutes);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
    console.log(`API available at http://localhost:${port}/api`);
  });
};

start();
