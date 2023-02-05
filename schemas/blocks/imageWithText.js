import { BlockElementIcon } from '@sanity/icons';

export default {
  title: 'Image with Text',
  name: 'block.imageWithText',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'link',
      title: 'Link',
    },
  ],
  fields: [
    {
      title: 'Overline',
      name: 'overline',
      type: 'string',
      group: 'editorial',
    },
    {
      title: 'Copy',
      name: 'bodyCopy',
      type: 'blockContent',
      group: 'editorial',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      description: 'Which side is the image on?',
      group: 'media',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
          { title: 'Center', value: 'center' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageObject',
      group: 'media',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
      group: 'link',
    },
    {
      title: 'Hidden',
      name: 'hidden',
      type: 'boolean',
      group: 'editorial',
    },
  ],
  preview: {
    select: {
      title: 'overline',
      blocks: 'bodyCopy',
      image: 'image',
    },
    prepare({ title, blocks, image }) {
      const block = (blocks || []).find((block) => block._type === 'block');
      return {
        title: title || 'Image With Text',
        subtitle: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : '',
        media: image || BlockElementIcon,
      };
    },
  },
};
