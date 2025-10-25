import { ResourceOptions } from 'adminjs';

const productResourceOptions: ResourceOptions = {
  navigation: {
    name: 'Catalog',
    icon: 'ShoppingCart',
  },
  properties: {
    id: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    name: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
    },
    description: {
      isVisible: { list: false, filter: false, show: true, edit: true },
      type: 'textarea',
    },
    price: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
      type: 'number',
    },
    stock: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
      type: 'number',
    },
    categoryId: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
    },
    image: {
      isVisible: { list: false, filter: false, show: true, edit: true },
      type: 'string',
    },
    createdAt: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    updatedAt: {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
  },
  listProperties: ['id', 'name', 'price', 'stock', 'categoryId', 'createdAt'],
  showProperties: ['id', 'name', 'description', 'price', 'stock', 'categoryId', 'image', 'createdAt', 'updatedAt'],
  editProperties: ['name', 'description', 'price', 'stock', 'categoryId', 'image'],
  filterProperties: ['name', 'price', 'stock', 'categoryId', 'createdAt'],
};

export default productResourceOptions;
