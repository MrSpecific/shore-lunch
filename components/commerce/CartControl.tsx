import classNames from 'classnames';
import { CartIcon } from '@svg';
import { useShoppingCart } from 'use-shopping-cart';
import { useCartDispatch, useCartState, useCartMeta } from '@context/cart';
import { gtagEvent } from '@lib/google';
import styles from '@styles/components/CartControl.module.css';

const CartControl = () => {
  const { total_items } = useCartState();
  const { openCart, shouldDisplayCart } = useCartMeta();

  return (
    <button
      onClick={() => {
        openCart();
      }}
      className={classNames('button-link', [styles.cartControl])}
    >
      <span className={styles.buttonInner}>
        <CartIcon style={{ height: '30px', width: '30px' }} />
        {!!total_items && <span className={styles.cartCount}>{total_items} items</span>}
      </span>
      <span className="visually-hidden">{shouldDisplayCart ? 'Close' : 'Open'} Cart</span>
    </button>
  );
};

export default CartControl;
