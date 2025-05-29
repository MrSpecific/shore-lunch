import { BookIcon } from '@sanity/icons';

export default {
  title: 'Recipe',
  name: 'recipe',
  type: 'document',
  icon: BookIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      title: 'Image',
      name: 'image',
      type: 'imageObject',
    },
    {
      title: 'Instructions',
      name: 'instructions',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      title: 'Ingredients',
      name: 'ingredients',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      title: 'Preparation Time',
      name: 'preparationTime',
      type: 'string',
      description: 'e.g., "30 minutes"',
    },
    {
      title: 'Cooking Time',
      name: 'cookingTime',
      type: 'string',
      description: 'e.g., "1 hour"',
    },
    {
      title: 'Servings',
      name: 'servings',
      type: 'number',
      description: 'Number of servings this recipe yields.',
    },
  ],
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
