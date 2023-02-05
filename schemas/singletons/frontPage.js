import { HomeIcon } from '@sanity/icons';

export default {
  title: 'Front Page',
  name: 'frontPage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'hero',
      title: 'Hero',
    },
  ],
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'hero',
      group: 'hero',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      };
    },
  },
};
