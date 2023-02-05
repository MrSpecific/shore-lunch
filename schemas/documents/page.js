import { EarthAmericasIcon } from '@sanity/icons';

export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: EarthAmericasIcon,
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
      name: 'template',
      title: 'Page Template',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Informational', value: 'informational' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'hero',
      title: 'Hero',
      type: 'imageObject',
      group: 'editorial',
    },
    {
      name: 'blocks',
      title: 'Blocks',
      type: 'blocks',
      group: 'editorial',
    },
  ],
  initialValue: {
    template: 'default',
  },
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
