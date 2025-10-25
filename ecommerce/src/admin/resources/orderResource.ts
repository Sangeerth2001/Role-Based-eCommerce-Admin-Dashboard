import { ResourceOptions } from 'adminjs';

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
  listProperties: ['id', 'userId', 'status', 'totalAmount', 'createdAt'],
  showProperties: ['id', 'userId', 'status', 'totalAmount', 'createdAt', 'updatedAt'],
  editProperties: ['userId', 'status', 'totalAmount'],
  filterProperties: ['userId', 'status', 'totalAmount', 'createdAt'],
};

export default orderResourceOptions;
