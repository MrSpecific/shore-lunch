import classNames from 'classnames';
import { getEpisodePaths, getDynamicPage, fetchSanityContent } from '@lib/sanity';
import { Page } from '@layout';
import SanityImage from '@components/SanityImage';
import BlocksGroup from '@components/BlocksGroup';
import Hero from '@components/Hero';
import styles from '@styles/page/EpisodePage.module.css';

export default function EpisodePage({ data, ...props }) {
  const { template, title, cover } = data || {};

  console.log(data);

  const contentContainerClass = classNames({
    [styles.contentContainer]: true,
    ['content container']: true,
  });

  return (
    <Page title={title}>
      <div className={styles.dynamicPage} data-template={template}>
        <SanityImage
          {...cover}
          width={2000}
          height={'auto'}
          style={{ margin: 'var(--spacer-m) 0' }}
        />
        <div className={contentContainerClass}>
          {title && <h1 className={styles.headline}>{title}</h1>}
          {JSON.stringify(cover, null, 2)}
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const page = await fetchSanityContent('episode', { slug: params.slug });

  return {
    props: {
      data: { ...page },
    },
  };
}

export async function getStaticPaths() {
  const paths = await fetchSanityContent('episodePaths');

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
