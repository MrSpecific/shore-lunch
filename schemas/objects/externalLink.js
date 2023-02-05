import { LinkIcon } from '@sanity/icons';

export default {
  name: 'externalLink',
  title: 'ExternalLink',
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
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    },
    {
      name: 'isNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    },
  ],
};
