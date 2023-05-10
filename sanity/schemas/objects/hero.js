import { ImageIcon } from '@sanity/icons';

export default {
  title: 'Hero',
  name: 'hero',
  type: 'object',
  icon: ImageIcon,
  groups: [
    {
      name: 'image',
      title: 'Image',
    },
    {
      name: 'cta',
      title: 'CTA',
    },
  ],
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'imageObject',
      group: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Headline',
      name: 'headline',
      type: 'string',
      group: 'cta',
    },
    {
      title: 'Call To Action',
      name: 'cta',
      type: 'linkItem',
      group: 'cta',
    },
  ],
  // preview: {
  //   select: {
  //     alt: 'image.alt',
  //     caption: 'image.caption',
  //     image: 'image',
  //   },
  //   prepare({ alt, caption, image }) {
  //     return {
  //       title: 'Hero',
  //       subtitle: alt || caption || '',
  //       media: image || ImageIcon,
  //     };
  //   },
  // },
};
