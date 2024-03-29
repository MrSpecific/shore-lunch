import { apiVersion, dataset, projectId, useCdn, token } from '@lib/sanity';
import { createClient } from 'next-sanity';
// import { apiVersion, dataset, projectId, useCdn } from '@config/sanityConfig';
import * as queries from './sanity.queries';

const { log, error } = console;

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

export const adminClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export const getQuery = (key: string | number | symbol) => {
  const obj: typeof queries = queries;
  return obj[key as keyof typeof queries];
};

export async function fetchSanityContent(queryName: string, params = {}) {
  if (!client) return {};

  try {
    const query = getQuery(queryName);

    // console.log('Query is', query);

    if (!query) throw new Error(`Query ${queryName} not found`);

    return await client.fetch(query, params);
  } catch (err) {
    error(err);
  }
}
