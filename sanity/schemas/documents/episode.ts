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
      title: 'Title',
      name: 'title',
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
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Release Date',
      name: 'releaseDate',
      type: 'date',
      group: 'settings',
    },
    {
      title: 'Video URL',
      name: 'videoUrl',
      type: 'url',
      group: 'settings',
    },
    {
      title: 'Cover',
      name: 'cover',
      type: 'imageObject',
      group: 'editorial',
    },
    {
      title: 'Recipes',
      name: 'recipes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'recipe' }] }],
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
