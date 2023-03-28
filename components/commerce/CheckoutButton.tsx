import { useShoppingCart } from 'use-shopping-cart';
import { useCheckout } from '@hooks';

const CheckoutButton = () => {
  const { formattedTotalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart();
  const { loading, errorMessage, handleCheckout } = useCheckout();

  return (
    <button className="button" type="submit" disabled={!cartCount || loading}>
      Checkout
    </button>
  );
};

export default CheckoutButton;
