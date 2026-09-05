'use client';

import { useShoppingCart } from 'use-shopping-cart';

import { useCheckout } from '@hooks';
import { CheckoutButton } from '@commerce/CheckoutButton';
import css from './CartSummary.module.css';
import Link from 'next/link';

const CartSummary = () => {
  const { formattedTotalPrice, handleCloseCart } = useShoppingCart();
  const { errorMessage } = useCheckout();

  return (
    <div className="">
      <h3 className="visually-hidden">Cart summary</h3>
      {errorMessage ? <p style={{ color: 'red' }}>Error: {errorMessage}</p> : null}
      {/* This is where we'll render our cart */}
      {/* <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </p> */}
      <div className={css.cartSummary}>
        <p suppressHydrationWarning>
          <strong>Total:</strong> {formattedTotalPrice}
        </p>
        <Link href="/merch" onClick={handleCloseCart}>
          Continue Shopping
        </Link>
      </div>

      {/* Redirects the user to Stripe */}
      <div className={css.cartActions}>
        <CheckoutButton className={css.checkoutButton} />
        {/* <button className="button-link" type="button" onClick={clearCart}>
          Clear Cart
        </button> */}
      </div>
    </div>
  );
};

export default CartSummary;
