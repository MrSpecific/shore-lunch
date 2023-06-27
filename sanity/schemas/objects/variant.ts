export default {
  name: 'variant',
  title: 'Variant',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'number',
      validation: (Rule) => Rule.required(),
      initialValue: 0,
    },
  ],
};
