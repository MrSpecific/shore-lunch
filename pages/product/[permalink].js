import classNames from 'classnames';

import { enableLegendStateReact, observer } from '@legendapp/state/react';
import commerce from '@lib/commerce';
import { Page } from '@layout';
import BlocksGroup from '@components/BlocksGroup';
import Hero from '@components/Hero';
import styles from '@styles/page/EpisodePage.module.css';
import { useCartDispatch, useCartState, cart, cartState, cartCount } from '@context/cart';

const { log } = console;

enableLegendStateReact();

export default observer(function ProductPage({ product }) {
  const { id, template, name, hero, blocks } = product || {};
  const { setCart } = useCartDispatch();

  const addToCart = () =>
    commerce.cart.add(id).then(({ cart }) => {
      // cart.state.set(cart);
      cartState.set(cart);
      cartCount.set((v) => v + 1);
      return setCart(cart);
    });

  log('Cart state', cart.state.get());
  log('Cartstate', cartState.get());
  log('cartCount', cartCount.get());

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
          <button onClick={() => cart.count.set((v) => v + 1)}>Increment 1</button>
          <button onClick={() => cart.increment()}>Increment p</button>
          {cart.state.id} - {cart.state.total_items} | {cartCount} - {cart.count}
        </div>
      </div>
    </Page>
  );
});

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
