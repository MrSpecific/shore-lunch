import React, { useState, useEffect } from 'react';

import StripeTestCards from '@commerce/StripeTestCards';

import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON } from '@utils/apiHelpers';
import { useCheckout } from '@hooks';

const CartSummary = () => {
  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  const [cartEmpty, setCartEmpty] = useState(true);
  const { formattedTotalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart();

  const { loading, errorMessage, handleCheckout } = useCheckout();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  // const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   setErrorMessage('');

  //   const response = await fetchPostJSON('/api/checkout_sessions/cart', cartDetails);

  //   if (response.statusCode > 399) {
  //     // console.error(response.message);
  //     setErrorMessage(response.message);
  //     setLoading(false);
  //     return;
  //   }

  //   // redirectToCheckout({ sessionId: response.id.toString() });
  //   redirectToCheckout(response.id);
  // };

  return (
    <form onSubmit={handleCheckout}>
      <h2>Cart summary</h2>
      {errorMessage ? <p style={{ color: 'red' }}>Error: {errorMessage}</p> : null}
      {/* This is where we'll render our cart */}
      <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>Total:</strong> {formattedTotalPrice}
      </p>

      {/* Redirects the user to Stripe */}
      <StripeTestCards />
      <button className="cart-style-background" type="submit" disabled={cartEmpty || loading}>
        Checkout
      </button>
      <button className="cart-style-background" type="button" onClick={clearCart}>
        Clear Cart
      </button>
    </form>
  );
};

export default CartSummary;
