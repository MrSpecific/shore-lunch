'use client';

import classNames from 'classnames';
import { CartIcon } from '@svg';
import { useShoppingCart } from 'use-shopping-cart';
import { gtagEvent } from '@lib/google';
import { useHasMounted } from '@hooks';
import styles from '@styles/components/CartControl.module.css';

const CartControl = () => {
  const { handleCartClick, shouldDisplayCart, cartCount } = useShoppingCart();
  // cartCount reflects use-shopping-cart's localStorage-persisted cart, which
  // isn't known until after the client mounts. The badge has fixed dimensions
  // (a visible dot), so it can't just stay always-rendered with empty text --
  // it needs to not exist at all until we know the real, rehydrated count.
  const hasMounted = useHasMounted();

  return (
    <button
      onClick={() => {
        handleCartClick();
        gtagEvent('add_to_cart');
      }}
      className={classNames('button-link', [styles.cartControl])}
    >
      <span className={styles.buttonInner}>
        <CartIcon style={{ height: '30px', width: '30px' }} />
        {hasMounted && !!cartCount && (
          <span className={styles.cartCount}>{cartCount} items</span>
        )}
      </span>
      <span className="visually-hidden">{shouldDisplayCart ? 'Close' : 'Open'} Cart</span>
    </button>
  );
};

export default CartControl;
