'use client';

import { useShoppingCart } from 'use-shopping-cart';

import { useCheckout } from '@hooks';
import CheckoutButton from '@commerce/CheckoutButton';
import styles from '@styles/components/CartSummary.module.css';

const CartSummary = () => {
  const { formattedTotalPrice } = useShoppingCart();
  const { errorMessage } = useCheckout();

  return (
    <div className="">
      <h3 className="visually-hidden">Cart summary</h3>
      {errorMessage ? <p style={{ color: 'red' }}>Error: {errorMessage}</p> : null}
      {/* This is where we'll render our cart */}
      {/* <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </p> */}
      <p suppressHydrationWarning>
        <strong>Total:</strong> {formattedTotalPrice}
      </p>

      {/* Redirects the user to Stripe */}
      <div className={styles.cartActions}>
        <CheckoutButton className={styles.checkoutButton} />
        {/* <button className="button-link" type="button" onClick={clearCart}>
          Clear Cart
        </button> */}
      </div>
    </div>
  );
};

export default CartSummary;
