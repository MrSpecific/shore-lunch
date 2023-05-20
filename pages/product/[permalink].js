import classNames from 'classnames';

import commerce from '@lib/commerce';
import { Page } from '@layout';
import BlocksGroup from '@components/BlocksGroup';
import Hero from '@components/Hero';
import styles from '@styles/page/EpisodePage.module.css';
import { useCartDispatch, useCartState } from '@context/cart';

const { log } = console;

export default function ProductPage({ product }) {
  const { id, template, name, hero, blocks } = product || {};
  const { setCart } = useCartDispatch();

  const addToCart = () => commerce.cart.add(id).then(({ cart }) => setCart(cart));

  const contentContainerClass = classNames({
    [styles.contentContainer]: true,
    ['content container']: true,
  });

  return (
    <Page title={name}>
      <div className={styles.dynamicPage} data-template={template}>
        <div className={contentContainerClass}>
          <h1 className={styles.headline}>{name}</h1>
          <button onClick={addToCart}>Add to Cart</button>
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
