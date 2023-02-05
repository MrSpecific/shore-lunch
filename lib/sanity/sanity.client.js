import { apiVersion, dataset, projectId, useCdn, token } from '@lib/sanity';
import {
  siteSettingsQuery,
  homePageQuery,
  allShowsPageQuery,
  roomPathsQuery,
  roomPageQuery,
  pagePathsQuery,
  dynamicPageQuery,
} from '@lib/sanity';
import { createClient } from 'next-sanity';
import handleize from 'utils/handleize';

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn, token })
  : null;

export async function getSiteSettings() {
  if (sanityClient) {
    return (await sanityClient.fetch(siteSettingsQuery)) || {};
  }
  return {};
}

export async function getHomePage() {
  if (sanityClient) {
    return (await sanityClient.fetch(homePageQuery)) || {};
  }
  return {};
}

export async function getAllShowsPage() {
  if (sanityClient) {
    return (await sanityClient.fetch(allShowsPageQuery)) || {};
  }
  return {};
}

export async function getRoomPaths() {
  if (sanityClient) {
    return (await sanityClient.fetch(roomPathsQuery)) || {};
  }
  return {};
}

export async function getRoomPage(slug) {
  if (sanityClient) {
    return (
      (await sanityClient.fetch(roomPageQuery, {
        slug: slug,
      })) || {}
    );
  }
  return {};
}

export async function getDynamicPagePaths() {
  if (sanityClient) {
    return (await sanityClient.fetch(pagePathsQuery)) || {};
  }
  return {};
}

export async function getDynamicPage(slug) {
  if (sanityClient) {
    return (
      (await sanityClient.fetch(dynamicPageQuery, {
        slug: slug,
      })) || {}
    );
  }
  return {};
}

export async function addEvent(eventData, venueId = null) {
  const { id, attributes, relationships } = eventData;
  const {
    name,
    short_name,
    settings,
    sales_open,
    sales_close,
    doors_open_time,
    description,
    start,
    end,
    inventory,
    image,
    status,
    url,
    behavior,
  } = attributes;
  const { hide_event_in_box_office } = settings;
  // const { venue } = relationships;
  const { series } = behavior;

  // TODO: need to know if venue is going to be using 'series' events in showclix (TBD)
  // TODO: if yes: need to setup a series document in Sanity and add child events to that series and establish a relationship between the series and the children
  // TODO: if no: child events won't exist and this can be removed
  const childEvent = behavior['child-event'];

  // NEEDED TO GET VENUE ID from second param because the venue id included in the eventData response is the id of the event -- not the venue
  // const venueId = venue?.links?.related
  //   ? venue.links.related.match(/\/events\/(\d+)/)[1]
  //   : null;

  // console.log('venueId', venueId) // this is the id of the event, not the venue

  // returns a promise
  const res = await sanityClient.createOrReplace({
    _id: id,
    _type: 'event',
    title: name,
    slug: {
      _type: 'slug',
      current: short_name,
    },
    url: short_name ? `https://www.showclix.com/event/${short_name}` : null,
    status,
    hideEvent: hide_event_in_box_office,
    series,
    childEvent,
    room: {
      _type: 'reference',
      _ref: venueId,
    },
    // generalAdmission: generalAdmission || true, // TODO: need to figure out if possible to get from showclix
    // reservedSeating: reservedSeating || false,  // TODO: need to figure out if possible to get from showclix
    start,
    end,
    salesOpen: sales_open,
    salesClose: sales_close,
    doorsOpen: doors_open_time,
    inventory,
    image: image ? `https:${image}` : null,
  });
  // console.log('res', res)
  return res;
}

export async function addVenue(venueData) {
  const { id, attributes, relationships } = venueData;
  const { name, description, address } = attributes;
  // const { lines, city, region, postal_code } = address;
  // const { events } = relationships;
  const slug = handleize(name);

  // returns a promise
  const res = await sanityClient.createOrReplace({
    _id: id,
    _type: 'room',
    title: name,
    venueId: id,
    slug: {
      _type: 'slug',
      current: slug,
    },
  });
  // console.log('res', res)
  return res;
}
