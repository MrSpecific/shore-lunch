export default {
  title: 'All Shows Page',
  name: 'allShowsPage',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      name: 'blocks',
      title: 'Blocks',
      type: 'blocks',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'All Shows Page',
      };
    },
  },
};
