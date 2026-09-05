import { ImageIcon } from '@sanity/icons/Image';

export default {
  title: 'ImageIcon',
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
