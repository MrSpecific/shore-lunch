import { ImageIcon } from '@sanity/icons';

export default {
  title: 'Image',
  name: 'imageObject',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true,
    metadata: ['palette', 'blurhash', 'lqip', 'exif', 'location'],
  },
  fields: [
    {
      title: 'Alt Text',
      name: 'alt',
      type: 'string',
    },
  ],
};
