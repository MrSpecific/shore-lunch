/* eslint-disable import/no-anonymous-default-export */
import { StarIcon } from '@sanity/icons'

export default {
  title: 'Event',
  name: 'event',
  type: 'document',
  icon: StarIcon,
  groups: [
    {
      name: 'supplemental',
      title: 'Supplemental',
    },
    {
      name: 'showclix',
      title: 'Showclix',
    }
  ],
  fields: [
    {
      title: 'Event Title',
      name: 'title',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
      group: 'showclix',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      readOnly: true,
      validation: (Rule) => Rule.required(),
      group: 'showclix',
    },
    {
      name: 'url',
      title: 'Event URL',
      type: 'url',
      readOnly: true,
      validation: (Rule) => Rule.required(),
      group: 'showclix',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      readOnly: true,
      group: 'showclix',
    },
    {
      name: 'hideEvent',
      title: 'Hide Event',
      type: 'boolean',
      group: 'showclix',
      readOnly: true,
      initialValue: false,
    },
    {
      name: 'series',
      title: 'Series',
      type: 'boolean',
      group: 'showclix',
      readOnly: true,
      initialValue: false,
    },
    {
      name: 'childEvent', // See TODO above about how to handle child events
      title: 'Child Event',
      type: 'boolean',
      group: 'showclix',
      readOnly: true,
      initialValue: false,
    },
    {
      name: 'room',
      title: 'Room',
      type: 'reference',
      to: { type: 'room' },
      readOnly: true,
      group: 'showclix',
    },
    {
      name: 'generalAdmission', // TODO: need to figure out if possible to get from showclix
      title: 'General Admission',
      type: 'boolean',
      group: 'supplemental',
      initialValue: true,
    },
    {
      name: 'reservedSeating', // TODO: need to figure out if possible to get from showclix
      title: 'Reserved Seating',
      type: 'boolean',
      group: 'supplemental',
      initialValue: false,
    },
    {
      name: 'start',
      title: 'Show Start Date & Time',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'MM-DD-YYYY',
        timeFormat: 'h:mmA',
      },
      group: 'showclix',
    },
    {
      name: 'end',
      title: 'Show End Date & Time',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'MM-DD-YYYY',
        timeFormat: 'h:mmA',
      },
      group: 'showclix',
    },
    {
      name: 'salesOpen',
      title: 'Sales Open',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'MM-DD-YYYY',
        timeFormat: 'h:mmA',
      },
      group: 'showclix',
    },
    {
      name: 'salesClose',
      title: 'Sales Close',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'MM-DD-YYYY',
        timeFormat: 'h:mmA',
      },
      group: 'showclix',
    },
    {
      name: 'doorsOpen',
      title: 'Doors Open',
      type: 'datetime',
      readOnly: true,
      group: 'showclix',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'supplemental',
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'number',
      readOnly: true,
      group: 'showclix',
    },
    {
      name: 'image',
      title: 'Showclix Image URL',
      type: 'url',
      readOnly: true,
      group: 'showclix',
    },
  ],
}
