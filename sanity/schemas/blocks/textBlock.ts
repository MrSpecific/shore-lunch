import { ComposeIcon } from '@sanity/icons';

export default {
  title: 'Text Block',
  name: 'block.text',
  type: 'object',
  icon: ComposeIcon,
  fields: [
    {
      title: 'Overline',
      name: 'overline',
      type: 'string',
    },
    {
      title: 'Copy',
      name: 'bodyCopy',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      title: 'Hidden',
      name: 'hidden',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'overline',
      blocks: 'bodyCopy',
    },
    prepare({ title, blocks }) {
      const block = (blocks || []).find((block) => block._type === 'block');
      return {
        title: title || 'Text Block',
        subtitle: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : '',
        media: ComposeIcon,
      };
    },
  },
};
