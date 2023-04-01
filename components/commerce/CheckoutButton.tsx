import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useShoppingCart } from 'use-shopping-cart';
import { useCheckout } from '@hooks';

interface CheckoutButtonInterface {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
}

const CheckoutButton: React.FunctionComponent<CheckoutButtonInterface> = ({ className }) => {
  const [cartEmpty, setCartEmpty] = useState(true);
  const { formattedTotalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart();
  const { loading, errorMessage, handleCheckout } = useCheckout();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  return (
    <button
      className={classNames('button', className)}
      type="button"
      onClick={(event) => handleCheckout(event)}
      disabled={cartEmpty || loading}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
