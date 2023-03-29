import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useShoppingCart } from 'use-shopping-cart';
import { useCheckout } from '@hooks';

const CheckoutButton = ({ className }) => {
  const [cartEmpty, setCartEmpty] = useState(true);
  const { formattedTotalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart();
  const { loading, errorMessage, handleCheckout } = useCheckout();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  return (
    <button
      className={classNames('button', className)}
      type="button"
      onClick={handleCheckout}
      disabled={cartEmpty || loading}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
