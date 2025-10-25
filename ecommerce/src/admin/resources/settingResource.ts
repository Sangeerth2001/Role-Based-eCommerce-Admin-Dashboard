import { ResourceOptions } from 'adminjs';

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
};

export default settingResourceOptions;
