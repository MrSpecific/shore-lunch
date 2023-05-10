import { SplitVerticalIcon } from '@sanity/icons';

export default {
  title: 'Title & Content',
  name: 'keyValuePair',
  type: 'object',
  icon: SplitVerticalIcon,
  fields: [
    {
      title: 'Title',
      name: 'key',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Content',
      name: 'value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'value',
    },
  },
};
