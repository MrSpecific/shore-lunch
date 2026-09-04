import type { MetadataRoute } from 'next';
import { fetchSanityContent } from '@lib/sanity';

type SitemapEntry = {
  slug: string;
  updatedAt?: string;
};

const SITE_URL = 'https://shore-lunch.com';

const entry = (path: string, lastModified?: string): MetadataRoute.Sitemap[number] => ({
  url: `${SITE_URL}${path === '/' ? '' : path}`,
  ...(lastModified ? { lastModified } : {}),
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [episodes, recipes, pages] = await Promise.all([
    fetchSanityContent('episodeSitemapQuery') as Promise<SitemapEntry[]>,
    fetchSanityContent('recipeSitemapQuery') as Promise<SitemapEntry[]>,
    fetchSanityContent('pageSitemapQuery') as Promise<SitemapEntry[]>,
  ]);

  const staticPaths = ['/', '/episodes', '/merch', '/privacy-policy', '/terms-conditions'];

  return [
    ...staticPaths.map((path) => entry(path)),
    ...(episodes || []).map((item) => entry(`/episode/${item.slug}`, item.updatedAt)),
    ...(recipes || []).map((item) => entry(`/recipe/${item.slug}`, item.updatedAt)),
    ...(pages || []).map((item) => entry(`/${item.slug}`, item.updatedAt)),
  ];
}
