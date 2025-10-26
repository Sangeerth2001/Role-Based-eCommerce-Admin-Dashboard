import { ResourceOptions } from 'adminjs';
import { getActionsConfig } from '../rbac.js';

const orderResourceOptions: ResourceOptions = {
  navigation: {
    name: 'Orders',
    icon: 'ShoppingBag',
  },
  properties: {
    id: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    userId: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
    },
    status: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
      availableValues: [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },
    totalAmount: {
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
  // Note: userId visibility is controlled per-property above
  listProperties: ['id', 'userId', 'status', 'totalAmount', 'createdAt'],
  showProperties: ['id', 'userId', 'status', 'totalAmount', 'createdAt', 'updatedAt'],
  editProperties: ['userId', 'status', 'totalAmount'],
  filterProperties: ['userId', 'status', 'totalAmount', 'createdAt'],
  // RBAC: Action-level permissions
  // Note: Users can see orders in the list but should use API filtering to show only their own
  actions: {
    list: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Order').list,
    },
    show: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Order').show,
    },
    new: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Order').new,
    },
    edit: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Order').edit,
    },
    delete: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Order').delete,
    },
    bulkDelete: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Order').bulkDelete,
    },
    search: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Order').search,
    },
  },
};

export default orderResourceOptions;
