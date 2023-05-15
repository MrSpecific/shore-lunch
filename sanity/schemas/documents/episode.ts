import { DesktopIcon } from '@sanity/icons';

export default {
  title: 'Episode',
  name: 'episode',
  type: 'document',
  icon: DesktopIcon,
  groups: [
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'editorial',
      title: 'Editorial',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'settings',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Cover',
      name: 'cover',
      type: 'imageObject',
      group: 'editorial',
    },
    {
      title: 'Recipe',
      name: 'recipe',
      type: 'reference',
      to: [{ type: 'recipe' }],
      group: 'editorial',
    },
    {
      title: 'Sponsors',
      name: 'sponsors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sponsor' }] }],
      group: 'editorial',
    },

    // {
    //   title: 'Video',
    //   name: 'video',
    //   type: 'videoId',
    // },
    // {
    //   title: 'Video',
    //   name: 'video',
    //   type: 'videoId',
    // },
  ],
  // initialValue: {
  //   template: 'default',
  // },
  // preview: {
  //   select: {
  //     title: 'title',
  //     media: 'mainImage',
  //   },
  //   prepare(selection) {
  //     const {author} = selection
  //     return Object.assign({}, selection, {
  //       subtitle: author && `by ${author}`,
  //     })
  //   },
  // },
};
