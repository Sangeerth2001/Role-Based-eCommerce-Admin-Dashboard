import { AdminJSOptions } from 'adminjs';

import componentLoader from './component-loader.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [],
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
