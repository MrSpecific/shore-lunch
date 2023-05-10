import { RemoveIcon } from '@sanity/icons';

// TODO don't render "Add Item" Button when array at max length
// https://github.com/sanity-io/sanity/pull/3797

export default {
  name: 'linkItem',
  title: 'Link Item',
  type: 'object',
  icon: RemoveIcon,
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      info: 'Only 1 selection is allowed',
      type: 'array',
      of: [{ type: 'link' }, { type: 'reference', to: [{ type: 'page' }, { type: 'product' }] }],
      validation: (Rule) => Rule.length(1),
    },
  ],
};
