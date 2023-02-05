/* eslint-disable import/no-anonymous-default-export */
import { RocketIcon } from '@sanity/icons';

export default {
  title: 'Room',
  name: 'room',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {
      name: 'supplemental',
      title: 'Supplemental',
    },
    {
      name: 'showclix',
      title: 'Showclix',
    },
  ],
  fields: [
    {
      title: 'Room Name',
      name: 'title',
      type: 'string',
      group: 'showclix',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96, // will be ignored if slugify is set
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      group: 'showclix',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'venueId',
      title: 'ShowClix Venue ID',
      type: 'string',
      group: 'showclix',
      readOnly: true,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'supplemental',
    },
    {
      name: 'hero',
      title: 'Hero',
      type: 'imageObject',
      group: 'supplemental',
    },
    {
      name: 'blocks',
      title: 'Blocks',
      type: 'blocks',
      group: 'supplemental',
    },
  ],
};
