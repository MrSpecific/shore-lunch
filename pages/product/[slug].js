import classNames from 'classnames';

import commerce from '@lib/commerce';
import { Page } from '@layout';
import BlocksGroup from '@components/BlocksGroup';
import Hero from '@components/Hero';
import styles from '@styles/page/EpisodePage.module.css';

export default function EpisodePage({ data, ...props }) {
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
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    type: 'permalink',
  });

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map((product) => ({
      params: {
        permalink: product.permalink,
      },
    })),
    fallback: false,
  };
}
