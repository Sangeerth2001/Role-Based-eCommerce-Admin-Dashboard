import { ResourceOptions } from 'adminjs';
import { getActionsConfig } from '../rbac.js';

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
  // RBAC: Action-level permissions
  actions: {
    list: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'OrderItem').list,
    },
    show: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'OrderItem').show,
    },
    new: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'OrderItem').new,
    },
    edit: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'OrderItem').edit,
    },
    delete: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'OrderItem').delete,
    },
    bulkDelete: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'OrderItem').bulkDelete,
    },
  },
};

export default orderItemResourceOptions;
