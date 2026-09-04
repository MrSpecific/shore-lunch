import { LinkIcon } from '@sanity/icons/Link';

export default {
  name: 'link',
  title: 'LinkIcon',
  type: 'object',
  icon: LinkIcon,
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    },
  ],
};
