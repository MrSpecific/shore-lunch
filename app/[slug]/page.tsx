import type { Metadata } from 'next';
import classNames from 'classnames';
import { fetchSanityContent } from '@lib/sanity';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import BlocksGroup from '@components/BlocksGroup';
import Hero from '@components/Hero';
import styles from '@styles/page/DynamicPage.module.css';

export const revalidate = 300; // REVALIDATE_SECONDS.pageDetail

export async function generateStaticParams() {
  const paths = await fetchSanityContent('pagePathsQuery');
  return paths.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchSanityContent('dynamicPageQuery', { slug });
  return buildMetadata({ path: `/${slug}`, pageTitle: data?.title });
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchSanityContent('dynamicPageQuery', { slug });
  const { template, title, hero, blocks } = data || {};

  const contentContainerClass = classNames({
    [styles.contentContainer]: true,
    ['content container']: true,
  });

  return (
    <Page>
      <div className={styles.dynamicPage} data-template={template}>
        {hero && <Hero {...hero} />}
        <div className={contentContainerClass}>
          {title && <h1 className={styles.headline}>{title}</h1>}
          {blocks && <BlocksGroup blocks={blocks} className={styles.contentBlock} />}
        </div>
      </div>
    </Page>
  );
}
