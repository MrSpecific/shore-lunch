/* eslint-disable import/no-anonymous-default-export */
import { CreditCardIcon } from '@sanity/icons';

export default {
  title: 'Product',
  name: 'product',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    // {
    //   title: 'Slug',
    //   name: 'slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    //   validation: (Rule) => Rule.required(),
    // },
    // {
    //   title: 'Image',
    //   name: 'image',
    //   type: 'image',
    //   validation: (Rule) => Rule.required(),
    // },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule) => Rule.required().min(1).max(5),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      rows: '4',
    },
    {
      title: 'Vote',
      name: 'vote',
      type: 'string',
      options: {
        layout: 'grid',
        list: ['yes', 'no', 'maybe'],
      },
    },
    {
      title: 'Vote Count',
      name: 'voteCount',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  initialValue: {
    voteCount: 0,
  },
  preview: {
    select: {
      media: 'images.0',
      title: 'title',
    },
    // prepare: ({ media, title }) => {
    //   return {
    //     title,
    //     media,
    //   };
    // },
  },
};
