import { ResourceOptions } from 'adminjs';

const categoryResourceOptions: ResourceOptions = {
  navigation: {
    name: 'Catalog',
    icon: 'Tag',
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
      isVisible: { list: true, filter: false, show: true, edit: true },
      type: 'textarea',
    },
    createdAt: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    updatedAt: {
      isVisible: { list: false, filter: false, show: true, edit: false },
    },
  },
  listProperties: ['id', 'name', 'description', 'createdAt'],
  showProperties: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
  editProperties: ['name', 'description'],
  filterProperties: ['name', 'createdAt'],
};

export default categoryResourceOptions;
