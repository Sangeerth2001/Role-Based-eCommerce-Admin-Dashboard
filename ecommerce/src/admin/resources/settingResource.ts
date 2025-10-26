import { ResourceOptions } from 'adminjs';
import { getActionsConfig } from '../rbac.js';

const settingResourceOptions: ResourceOptions = {
  navigation: {
    name: 'Settings',
    icon: 'Settings',
  },
  properties: {
    id: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    key: {
      isVisible: { list: true, filter: true, show: true, edit: true },
      isRequired: true,
    },
    value: {
      isVisible: { list: true, filter: false, show: true, edit: true },
      isRequired: true,
      type: 'textarea',
    },
    description: {
      isVisible: { list: false, filter: false, show: true, edit: true },
      type: 'textarea',
    },
    createdAt: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    updatedAt: {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
  },
  listProperties: ['id', 'key', 'value', 'createdAt'],
  showProperties: ['id', 'key', 'value', 'description', 'createdAt', 'updatedAt'],
  editProperties: ['key', 'value', 'description'],
  filterProperties: ['key', 'createdAt'],
  // RBAC: Action-level permissions
  actions: {
    list: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Setting').list,
    },
    show: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Setting').show,
    },
    new: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Setting').new,
    },
    edit: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Setting').edit,
    },
    delete: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Setting').delete,
    },
    bulkDelete: {
      isAccessible: ({ currentAdmin }) => getActionsConfig(currentAdmin, 'Setting').bulkDelete,
    },
  },
};

export default settingResourceOptions;
