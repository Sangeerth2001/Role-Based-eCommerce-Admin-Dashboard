import { AdminJSOptions } from 'adminjs';
import { User, Category, Product, Order, OrderItem, Setting } from '../db/index.js';

import componentLoader from './component-loader.js';
import userResourceOptions from './resources/userResource.js';
import categoryResourceOptions from './resources/categoryResource.js';
import productResourceOptions from './resources/productResource.js';
import orderResourceOptions from './resources/orderResource.js';
import orderItemResourceOptions from './resources/orderItemResource.js';
import settingResourceOptions from './resources/settingResource.js';

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
        // Both admins and users can view categories
        isAccessible: ({ currentAdmin }) => !!currentAdmin,
        isVisible: ({ currentAdmin }) => !!currentAdmin,
      },
    },
    {
      resource: Product,
      options: {
        ...productResourceOptions,
        // Both admins and users can view products
        isAccessible: ({ currentAdmin }) => !!currentAdmin,
        isVisible: ({ currentAdmin }) => !!currentAdmin,
      },
    },
    {
      resource: Order,
      options: {
        ...orderResourceOptions,
        // Both admins and users can view orders (users will only see their own)
        isAccessible: ({ currentAdmin }) => !!currentAdmin,
        isVisible: ({ currentAdmin }) => !!currentAdmin,
        actions: {
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              // If user is not an admin, filter orders to show only their own
              if (currentAdmin && currentAdmin.role !== 'admin') {
                request.query = {
                  ...request.query,
                  'filters.userId': currentAdmin.id,
                };
              }
              return request;
            },
          },
        },
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
};

export default options;
