import { ImageIcon } from '@sanity/icons';

export default {
  title: 'Image',
  name: 'imageObject',
  type: 'image',
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    {
      title: 'Alt Text',
      name: 'alt',
      type: 'string',
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
  ],
};
