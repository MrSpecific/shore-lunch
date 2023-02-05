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

const MetaTags = ({ tags, path, pageTitle }) => {
  const { seoTags: defaultTags } = siteInfo;
  const {
    metaTitle,
    metaDescription,
    openGraphTitle,
    openGraphDescription,
    openGraphImage,
    openGraphType,
  } = tags || {};

  const autoTitle = (pageTitle && `${siteInfo.title} | ${pageTitle}`) || siteInfo.title;

  return (
    <>
      <Head>
        <title>{metaTitle || autoTitle}</title>
        <meta
          name="description"
          content={
            metaDescription ||
            openGraphDescription ||
            defaultTags?.metaDescription ||
            siteInfo.description
          }
        />
      </Head>

      <MetaTag property="og:title" content={openGraphTitle || metaTitle || autoTitle} />
      <MetaTag property="og:site_name" content={siteInfo.title} />
      <MetaTag property="og:url" content={`${siteInfo.url}${path}`} />
      <MetaTag
        property="og:description"
        content={openGraphDescription || defaultTags?.openGraphDescription || siteInfo.description}
      />
      <MetaTag property="og:type" content={openGraphType || 'website'} />
      <MetaTag property="og:image" content={openGraphImage || defaultTags?.openGraphImage} />
      <MetaTag property="twitter:image" content={openGraphImage || defaultTags?.openGraphImage} />
    </>
  );
};

export default MetaTags;
