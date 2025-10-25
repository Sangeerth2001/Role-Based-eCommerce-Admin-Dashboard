import { ResourceOptions } from 'adminjs';

const orderItemResourceOptions: ResourceOptions = {
  navigation: {
    name: 'Orders',
    icon: 'List',
  },
  properties: {
    id: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    orderId: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
    },
    productId: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
    },
    quantity: {
      isVisible: { list: true, filter: false, show: true, edit: true },
      isRequired: true,
      type: 'number',
    },
    price: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
      type: 'number',
    },
    createdAt: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    updatedAt: {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
  },
  listProperties: ['id', 'orderId', 'productId', 'quantity', 'price', 'createdAt'],
  showProperties: ['id', 'orderId', 'productId', 'quantity', 'price', 'createdAt', 'updatedAt'],
  editProperties: ['orderId', 'productId', 'quantity', 'price'],
  filterProperties: ['orderId', 'productId', 'price', 'createdAt'],
};

export default orderItemResourceOptions;
