import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useShoppingCart } from 'use-shopping-cart';

import { useCartDispatch, useCartState, useCartMeta } from '@context/cart';
import { useCheckout } from '@hooks';
import CheckoutButton from '@commerce/CheckoutButton';
import StripeTestCards from '@commerce/StripeTestCards';
import styles from '@styles/components/CartSummary.module.css';

const CartSummary = () => {
  const { total_items: totalItems, subtotal } = useCartState();
  const [cartEmpty, setCartEmpty] = useState(true);
  const { clearCart, cartDetails, redirectToCheckout } = useShoppingCart();

  const { loading, errorMessage, handleCheckout } = useCheckout();

  const { formatted_with_symbol: formattedTotalPrice } = subtotal;

  // useEffect(() => setCartEmpty(!totalItems), [totalItems]);

  return (
    // <form onSubmit={handleCheckout}>
    <div className="">
      <h3 className="visually-hidden">Cart summary</h3>
      {errorMessage ? <p style={{ color: 'red' }}>Error: {errorMessage}</p> : null}
      {/* This is where we'll render our cart */}
      {/* <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {totalItems}
      </p> */}
      <p suppressHydrationWarning>
        <strong>Total:</strong> {formattedTotalPrice}
      </p>

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
