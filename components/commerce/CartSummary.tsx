import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useShoppingCart } from 'use-shopping-cart';

import { useCheckout } from '@hooks';
import CheckoutButton from '@commerce/CheckoutButton';
import StripeTestCards from '@commerce/StripeTestCards';
import styles from '@styles/components/CartSummary.module.css';

const CartSummary = () => {
  const [cartEmpty, setCartEmpty] = useState(true);
  const { formattedTotalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart();

  const { loading, errorMessage, handleCheckout } = useCheckout();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  return (
    // <form onSubmit={handleCheckout}>
    <div>
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
      {/* <StripeTestCards /> */}
      <div className={styles.cartActions}>
        <CheckoutButton className={styles.checkoutButton} />
        <button className="button-link" type="button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
