import { CogIcon } from '@sanity/icons';

//https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'siteInfo',
      title: 'Site Info',
    },
    {
      name: 'headerSettings',
      title: 'Header Settings',
    },
    {
      name: 'contactInfo',
      title: 'Contact Info',
    },
    {
      name: 'links',
      title: 'Links',
    },
    {
      name: 'siteNavigation',
      title: 'Site Navigation',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'siteInfo',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'siteInfo',
    },
    // Header Settings
    {
      name: 'announcement',
      title: 'Announcement',
      type: 'string',
      group: 'headerSettings',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      group: 'headerSettings',
    },
    // Contact
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contactInfo',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      group: 'contactInfo',
    },
    {
      name: 'fullAddress',
      title: 'Full Address',
      type: 'string',
      group: 'contactInfo',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'externalLink' }],
      group: 'contactInfo',
    },
    // Navigation
    {
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      of: [{ type: 'linkItem' }, { type: 'linkList' }],
      group: 'siteNavigation',
    },
  ],
};
