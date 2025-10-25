import { AdminJSOptions } from 'adminjs';
import { User, Category, Product, Order, OrderItem, Setting } from '../db/index.js';

import componentLoader from './component-loader.js';
import userResourceOptions from './resources/userResource.js';
import categoryResourceOptions from './resources/categoryResource.js';
import productResourceOptions from './resources/productResource.js';
import orderResourceOptions from './resources/orderResource.js';
import orderItemResourceOptions from './resources/orderItemResource.js';
import settingResourceOptions from './resources/settingResource.js';
import adminDashboard from './pages/adminDashboard.js';
import settingsPage from './pages/settings.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        ...userResourceOptions,
        // Only admins can access user management
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
    },
    {
      resource: Category,
      options: {
        ...categoryResourceOptions,
        // Only admins can access categories
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
    },
    {
      resource: Product,
      options: {
        ...productResourceOptions,
        // Only admins can access products
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
    },
    {
      resource: Order,
      options: {
        ...orderResourceOptions,
        // Only admins can access orders
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
    },
    {
      resource: OrderItem,
      options: {
        ...orderItemResourceOptions,
        // Only admins can access order items directly
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
    },
    {
      resource: Setting,
      options: {
        ...settingResourceOptions,
        // Only admins can access settings
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
    },
  ],
  databases: [],
  branding: {
    companyName: 'eCommerce Admin',
    logo: false,
  },
  assets: {
    styles: ['/public/admin-custom.css'],
    scripts: ['/public/admin-custom.js'],
  },
  pages: {
    dashboard: adminDashboard,
    settings: settingsPage,
  },
  dashboard: {
    component: 'AdminDashboard',
  },
};

export default options;
