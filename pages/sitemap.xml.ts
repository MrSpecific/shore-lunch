import { fetchSanityContent } from '@lib/sanity';

type SitemapEntry = {
  slug: string;
  updatedAt?: string;
};

const SITE_URL = 'https://shore-lunch.com';

const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

const urlNode = (path: string, lastmod?: string) => {
  const safeLastmod = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
  return `<url><loc>${absoluteUrl(path)}</loc>${safeLastmod}</url>`;
};

function generateSiteMap({
  staticPaths,
  episodes,
  recipes,
  pages,
}: {
  staticPaths: string[];
  episodes: SitemapEntry[];
  recipes: SitemapEntry[];
  pages: SitemapEntry[];
}) {
  const nodes = [
    ...staticPaths.map((path) => urlNode(path)),
    ...episodes.map((item) => urlNode(`/episode/${item.slug}`, item.updatedAt)),
    ...recipes.map((item) => urlNode(`/recipe/${item.slug}`, item.updatedAt)),
    ...pages.map((item) => urlNode(`/${item.slug}`, item.updatedAt)),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${nodes.join('\n')}
</urlset>`;
}

function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const [episodes, recipes, pages] = await Promise.all([
    fetchSanityContent('episodeSitemapQuery'),
    fetchSanityContent('recipeSitemapQuery'),
    fetchSanityContent('pageSitemapQuery'),
  ]);

  const staticPaths = ['/', '/episodes', '/merch', '/privacy-policy', '/terms-conditions'];

  const sitemap = generateSiteMap({
    staticPaths,
    episodes: episodes || [],
    recipes: recipes || [],
    pages: pages || [],
  });

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
