import { MenuIcon } from '@sanity/icons';

export default {
  name: 'linkList',
  title: 'Link List',
  type: 'object',
  icon: MenuIcon,
  fields: [
    {
      name: 'mainLink',
      title: 'Main Link',
      type: 'linkItem',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'linkList',
      title: 'Sub Links',
      type: 'array',
      of: [{ type: 'linkItem' }],
    },
  ],
  preview: {
    select: {
      mainLink: 'mainLink',
      linkList: 'linkList',
      link0: 'linkList.0.label',
      link1: 'linkList.1.label',
      link2: 'linkList.2.label',
      link3: 'linkList.3.label',
    },
    prepare({ mainLink, link0, link1, link2, link3 }) {
      const links = [link0, link1, link2].filter(Boolean);
      const subtitle = links.length > 0 ? `→ ${links.join(', ')}` : '';
      const hasMoreLinks = Boolean(link3);
      return {
        title: mainLink.label,
        subtitle: hasMoreLinks ? `${subtitle}…` : subtitle,
      };
    },
  },
};
