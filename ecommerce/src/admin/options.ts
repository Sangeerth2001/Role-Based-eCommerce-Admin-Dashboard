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
      options: userResourceOptions,
    },
    {
      resource: Category,
      options: categoryResourceOptions,
    },
    {
      resource: Product,
      options: productResourceOptions,
    },
    {
      resource: Order,
      options: orderResourceOptions,
    },
    {
      resource: OrderItem,
      options: orderItemResourceOptions,
    },
    {
      resource: Setting,
      options: settingResourceOptions,
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
