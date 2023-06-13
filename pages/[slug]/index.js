import classNames from 'classnames';
import { fetchSanityContent } from '@lib/sanity';
import { Page } from '@layout';
import BlocksGroup from '@components/BlocksGroup';
import Hero from '@components/Hero';
import styles from '@styles/page/DynamicPage.module.css';

export default function DynamicPage({ data, ...props }) {
  const { template, title, hero, blocks } = data || {};

  const contentContainerClass = classNames({
    [styles.contentContainer]: true,
    ['content container']: true,
  });

  return (
    <Page title={title}>
      <div className={styles.dynamicPage} data-template={template}>
        {hero && <Hero {...hero} />}
        <div className={contentContainerClass}>
          {title && <h1 className={styles.headline}>{title}</h1>}
          {blocks && <BlocksGroup blocks={blocks} blockClass={styles.contentBlock} />}
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const page = await fetchSanityContent('dynamicPageQuery', { slug: params.slug });

  return {
    props: {
      data: { ...page },
    },
  };
}

export async function getStaticPaths() {
  const paths = await fetchSanityContent('pagePathsQuery');

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
