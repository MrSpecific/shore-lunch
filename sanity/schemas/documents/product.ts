/* eslint-disable import/no-anonymous-default-export */
import { CreditCardIcon } from '@sanity/icons';

export default {
  title: 'Product',
  name: 'product',
  type: 'document',
  icon: CreditCardIcon,
  groups: [
    {
      name: 'info',
      title: 'Info',
      default: true,
    },
    {
      name: 'commerce',
      title: 'Commerce',
    },
    {
      name: 'meta',
      title: 'Meta',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'info',
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
      group: 'info',
    },
    // {
    //   title: 'Image',
    //   name: 'image',
    //   type: 'image',
    //   validation: (Rule) => Rule.required(),
    // },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule) => Rule.required().min(1).max(10),
      group: 'info',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: '4',
      group: 'info',
    },
    // {
    //   title: 'Vote',
    //   name: 'vote',
    //   type: 'string',
    //   options: {
    //     layout: 'grid',
    //     list: ['yes', 'no', 'maybe'],
    //   },
    // },
    // {
    //   title: 'Vote Count',
    //   name: 'voteCount',
    //   type: 'number',
    //   initialValue: 0,
    //   validation: (Rule) => Rule.required().min(0),
    // },
    {
      name: 'price',
      title: 'Price',
      type: 'currency',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
      group: 'commerce',
    },
    {
      name: 'hasVariants',
      title: 'Has Variants',
      type: 'boolean',
      initialValue: false,
      group: 'commerce',
    },
    {
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [{ type: 'variant' }],
      hidden: ({ parent }) => !parent?.hasVariants,
      group: 'commerce',
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'number',
      initialValue: 0,
      validation: (Rule) =>
        Rule.custom((currentValue, { parent }) => {
          if (!parent?.hasVariants && currentValue === undefined)
            return 'You must specify the inventory for this product, or use variants.';

          return true;
        }),
      hidden: ({ parent }) => parent?.hasVariants,
      group: 'commerce',
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
      group: 'commerce',
    },
    {
      name: 'lastSold',
      title: 'Last Sold',
      type: 'datetime',
      group: 'meta',
    },
  ],
  // initialValue: {
  //   voteCount: 0,
  // },
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
