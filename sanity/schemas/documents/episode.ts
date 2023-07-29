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
      default: true,
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
      title: 'Episode Number',
      name: 'episodeNumber',
      type: 'number',
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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'settings',
    },
    {
      name: 'cover',
      title: 'Cover',
      type: 'imageObject',
      group: 'settings',
      description: '(Optional) This will be used as the cover image for the episode.',
      // validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'editorial',
    },
    {
      name: 'recipes',
      title: 'Recipes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'recipe' }] }],
      group: 'editorial',
    },
    {
      name: 'sponsors',
      title: 'Sponsors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sponsor' }] }],
      group: 'editorial',
    },
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
