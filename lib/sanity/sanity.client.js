import { apiVersion, dataset, projectId, useCdn, token } from '@lib/sanity';
import {
  siteSettingsQuery,
  homePageQuery,
  pagePathsQuery,
  dynamicPageQuery,
  episodePathsQuery,
  episodeQuery,
  allEpisodesQuery,
} from '@lib/sanity';
import { createClient } from 'next-sanity';

const { log } = console;

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn, token })
  : null;

export const sanityCDNClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, token })
  : null;

export async function fetchSanityContent(contentType, params = {}) {
  if (!sanityClient) return {};

  const queryMap = {
    siteSettings: siteSettingsQuery,
    episodePaths: episodePathsQuery,
    episode: episodeQuery,
    allEpisodes: allEpisodesQuery,
  };

  return (queryMap[contentType] && (await sanityClient.fetch(queryMap[contentType], params))) || {};
}

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
