import classNames from 'classnames';
import { CartIcon } from '@svg';
import { useShoppingCart } from 'use-shopping-cart';
import styles from '@styles/components/CartControl.module.css';

const CartControl = () => {
  const { handleCartClick, shouldDisplayCart } = useShoppingCart();

  return (
    <button
      onClick={() => handleCartClick()}
      className={classNames('button-link', [styles.cartControl])}
    >
      <CartIcon style={{ height: '30px', width: '30px' }} />
      <span className="visually-hidden">{shouldDisplayCart ? 'Close' : 'Open'} Cart</span>
    </button>
  );
};

export default CartControl;
