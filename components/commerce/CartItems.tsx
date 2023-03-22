import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

import { Page } from '@layout';
import Cart from '@commerce/Cart';
import CartSummary from '@commerce/CartSummary';
import Products from '@commerce/Products';
import { useCheckout } from '@hooks';

const CartItems = () => {
  const [cartEmpty, setCartEmpty] = useState(true);
  const { formattedTotalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart();
  const { loading, errorMessage, handleCheckout } = useCheckout();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  return (
    <section>
      <form onSubmit={handleCheckout} suppressHydrationWarning>
        <h2>Your Cart</h2>
        {JSON.stringify(cartDetails, null, 2)}
        {errorMessage ? <p style={{ color: 'red' }}>Error: {errorMessage}</p> : null}
        {/* This is where we'll render our cart */}
        <p suppressHydrationWarning>
          <strong>Number of Items:</strong> {cartCount}
        </p>
        <p suppressHydrationWarning>
          <strong>Total:</strong> {formattedTotalPrice}
        </p>

        <button className="cart-style-background" type="submit" disabled={cartEmpty || loading}>
          Checkout
        </button>
        <button className="cart-style-background" type="button" onClick={clearCart}>
          Clear Cart
        </button>
      </form>
    </section>
  );
};

export default CartItems;
