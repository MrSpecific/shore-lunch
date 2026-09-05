import type { Metadata } from 'next';
import siteInfo from '@lib/siteInfo';

export type SeoTags = {
  metaTitle?: string;
  metaDescription?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
  openGraphType?: string;
  openGraphImageAlt?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

const normalizePath = (path = '/') => {
  const withoutQuery = path.split('?')[0].split('#')[0];
  const normalized = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  if (normalized.length > 1 && normalized.endsWith('/')) return normalized.slice(0, -1);
  return normalized || '/';
};

export function buildMetadata({
  tags,
  path,
  pageTitle,
}: {
  tags?: SeoTags;
  path: string;
  pageTitle?: string | null;
}): Metadata {
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
  const title = metaTitle || autoTitle;
  const description =
    metaDescription || openGraphDescription || defaultTags?.metaDescription || siteInfo.description;
  const resolvedOgImage = openGraphImage || defaultTags?.openGraphImage;
  const ogTitle = openGraphTitle || metaTitle || autoTitle;

  return {
    title,
    description,
    alternates: { canonical: resolvedCanonicalUrl },
    robots:
      noIndex || noFollow
        ? { index: !noIndex, follow: !noFollow }
        : undefined,
    openGraph: {
      title: ogTitle,
      siteName: siteInfo.title,
      url: resolvedCanonicalUrl,
      description: openGraphDescription || description,
      type: (openGraphType || 'website') as 'website',
      images: resolvedOgImage ? [{ url: resolvedOgImage, alt: openGraphImageAlt || siteInfo.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: openGraphDescription || description,
      images: resolvedOgImage ? [resolvedOgImage] : undefined,
    },
  };
}
