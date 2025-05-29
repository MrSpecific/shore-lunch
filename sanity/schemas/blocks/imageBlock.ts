import { BlockElementIcon } from '@sanity/icons';

export default {
  title: 'Image Block',
  name: 'block.image',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'media',
      title: 'Media',
      default: true,
    },
    {
      name: 'editorial',
      title: 'Editorial',
    },
  ],
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'imageObject',
      group: 'media',
      validation: (Rule) => Rule.required(),
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
      title: 'image.caption',
      image: 'image',
    },
    prepare({ title, blocks, image }) {
      const block = (blocks || []).find((block) => block._type === 'block');
      return {
        title: title || 'Image',
        media: image || BlockElementIcon,
      };
    },
  },
};
