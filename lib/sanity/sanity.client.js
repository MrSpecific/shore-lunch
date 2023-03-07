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

export async function addProduct(product) {
  const { id, active, default_price, description, name } = product;
  const slug = handleize(name);

  // returns a promise
  const res = await sanityClient.createOrReplace({
    _id: id,
    _type: 'event',
    title: name,
    slug: {
      _type: 'slug',
      current: slug,
    },
    status: active,
  });
  // console.log('res', res)
  return res;
}
