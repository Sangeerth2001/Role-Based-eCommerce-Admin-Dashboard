import { AdminJSOptions } from 'adminjs';
import { User, Category, Product, Order, OrderItem, Setting } from '../db/index.js';

import componentLoader from './component-loader.js';
import userResourceOptions from './resources/userResource.js';
import categoryResourceOptions from './resources/categoryResource.js';
import productResourceOptions from './resources/productResource.js';
import orderResourceOptions from './resources/orderResource.js';
import orderItemResourceOptions from './resources/orderItemResource.js';
import settingResourceOptions from './resources/settingResource.js';
import settingsPage from './pages/settings.js';
import {
  isResourceAccessible,
  isResourceVisible,
} from './rbac.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        ...userResourceOptions,
        // RBAC: Only admins can access user management
        isAccessible: ({ currentAdmin }) => isResourceAccessible(currentAdmin, 'User'),
        isVisible: ({ currentAdmin }) => isResourceVisible(currentAdmin, 'User'),
      },
    },
    {
      resource: Category,
      options: {
        ...categoryResourceOptions,
        // RBAC: Only admins can access categories
        isAccessible: ({ currentAdmin }) => isResourceAccessible(currentAdmin, 'Category'),
        isVisible: ({ currentAdmin }) => isResourceVisible(currentAdmin, 'Category'),
      },
    },
    {
      resource: Product,
      options: {
        ...productResourceOptions,
        // RBAC: Only admins can access products in admin panel
        isAccessible: ({ currentAdmin }) => isResourceAccessible(currentAdmin, 'Product'),
        isVisible: ({ currentAdmin }) => isResourceVisible(currentAdmin, 'Product'),
      },
    },
    {
      resource: Order,
      options: {
        ...orderResourceOptions,
        // RBAC: Admins can access all orders
        isAccessible: ({ currentAdmin }) => isResourceAccessible(currentAdmin, 'Order'),
        isVisible: ({ currentAdmin }) => isResourceVisible(currentAdmin, 'Order'),
      },
    },
    {
      resource: OrderItem,
      options: {
        ...orderItemResourceOptions,
        // RBAC: Only admins can access order items directly
        isAccessible: ({ currentAdmin }) => isResourceAccessible(currentAdmin, 'OrderItem'),
        isVisible: ({ currentAdmin }) => isResourceVisible(currentAdmin, 'OrderItem'),
      },
    },
    {
      resource: Setting,
      options: {
        ...settingResourceOptions,
        // RBAC: Only admins can access settings
        isAccessible: ({ currentAdmin }) => isResourceAccessible(currentAdmin, 'Setting'),
        isVisible: ({ currentAdmin }) => isResourceVisible(currentAdmin, 'Setting'),
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
    // Admin-only pages - RBAC controlled in component
    settings: settingsPage,
    // User pages - accessible to regular users - RBAC controlled in components
    products: {
      component: 'UserProducts',
      icon: 'ShoppingCart',
    },
    cart: {
      component: 'UserCart',
      icon: 'ShoppingBag',
    },
    checkout: {
      component: 'UserCheckout',
      icon: 'CreditCard',
    },
    'user-settings': {
      component: 'UserSettings',
      icon: 'User',
    },
  },
  dashboard: {
    component: 'RoleDashboard', // Smart component that shows AdminDashboard or UserDashboard based on role
  },
};

export default options;
