import { ClockIcon } from '@sanity/icons';

export default {
  title: 'Open Hours',
  name: 'block.openHours',
  type: 'object',
  icon: ClockIcon,
  fields: [
    {
      title: 'Open Hours List',
      name: 'hours',
      type: 'array',
      of: [{ type: 'keyValuePair' }],
    },
    {
      title: 'Hidden',
      name: 'hidden',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Open Hours',
        media: ClockIcon,
      };
    },
  },
};
