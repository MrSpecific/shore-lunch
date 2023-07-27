import { HomeIcon } from '@sanity/icons';

export default {
  title: 'Front Page',
  name: 'frontPage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      title: 'Hero',
      name: 'hero',
      type: 'imageObject',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Mobile Hero',
      name: 'heroMobile',
      type: 'imageObject',
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
