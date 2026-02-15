import Head from 'next/head';
import siteInfo from '@lib/siteInfo';

export const MetaTag = ({ property, content }) => {
  if (!property || !content) return null;
  return (
    <Head>
      <meta property={property} content={content} key={property} />
    </Head>
  );
};

export const NameMetaTag = ({ name, content }) => {
  if (!name || !content) return null;
  return (
    <Head>
      <meta name={name} content={content} key={name} />
    </Head>
  );
};

const normalizePath = (path = '/') => {
  const withoutQuery = path.split('?')[0].split('#')[0];
  const normalized = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  if (normalized.length > 1 && normalized.endsWith('/')) return normalized.slice(0, -1);
  return normalized || '/';
};

const MetaTags = ({ tags, path, pageTitle }) => {
  const { seoTags: defaultTags } = siteInfo;
  const {
    metaTitle,
    metaDescription,
    openGraphTitle,
    openGraphDescription,
    openGraphImage,
    openGraphType,
    openGraphImageAlt,
    canonicalPath,
    canonicalUrl,
    noIndex,
    noFollow,
  } = tags || {};

  const normalizedPath = normalizePath(path);
  const resolvedCanonicalUrl = canonicalUrl || `${siteInfo.url}${canonicalPath || normalizedPath}`;
  const autoTitle = (pageTitle && `${siteInfo.title} | ${pageTitle}`) || siteInfo.title;
  const description =
    metaDescription || openGraphDescription || defaultTags?.metaDescription || siteInfo.description;
  const resolvedOgImage = openGraphImage || defaultTags?.openGraphImage;
  const robots =
    noIndex || noFollow
      ? `${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`
      : null;

  return (
    <>
      <Head>
        <title>{metaTitle || autoTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={resolvedCanonicalUrl} />
        {robots && <meta name="robots" content={robots} />}
      </Head>

      <MetaTag property="og:title" content={openGraphTitle || metaTitle || autoTitle} />
      <MetaTag property="og:site_name" content={siteInfo.title} />
      <MetaTag property="og:url" content={resolvedCanonicalUrl} />
      <MetaTag property="og:description" content={openGraphDescription || description} />
      <MetaTag property="og:type" content={openGraphType || 'website'} />
      <MetaTag property="og:image" content={resolvedOgImage} />
      <MetaTag property="og:image:alt" content={openGraphImageAlt || siteInfo.title} />
      <NameMetaTag name="twitter:card" content="summary_large_image" />
      <NameMetaTag name="twitter:title" content={openGraphTitle || metaTitle || autoTitle} />
      <NameMetaTag name="twitter:description" content={openGraphDescription || description} />
      <NameMetaTag name="twitter:image" content={resolvedOgImage} />
    </>
  );
};

export default MetaTags;
