/* eslint-disable import/no-anonymous-default-export */
export default {
  title: 'Collection',
  name: 'productCollection',
  type: 'document',
  fields: [
    {
      title: 'Headline',
      name: 'headline',
      type: 'string',
    },
    { title: 'Intro', name: 'intro', type: 'blockContent' },
    {
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'headline', type: 'string', title: 'Headline' },
            { name: 'subhead', type: 'string', title: 'Subhead' },
            {
              name: 'products',
              type: 'array',
              title: 'Products',
              of: [{ type: 'reference', to: { type: 'product' } }],
            },
          ],
        },
      ],
    },
  ],
};
