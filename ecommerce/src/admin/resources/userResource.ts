import { ResourceOptions } from 'adminjs';

const userResourceOptions: ResourceOptions = {
  navigation: {
    name: 'User Management',
    icon: 'User',
  },
  properties: {
    id: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    name: {
      isVisible: { list: true, filter: true, show: true, edit: true },
    },
    email: {
      isVisible: { list: true, filter: true, show: true, edit: true },
    },
    password: {
      isVisible: { list: false, filter: false, show: false, edit: true },
      type: 'password',
    },
    role: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      availableValues: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
    },
    createdAt: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    updatedAt: {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
  },
  listProperties: ['id', 'name', 'email', 'role', 'createdAt'],
  showProperties: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
  editProperties: ['name', 'email', 'password', 'role'],
  filterProperties: ['name', 'email', 'role', 'createdAt'],
};

export default userResourceOptions;
