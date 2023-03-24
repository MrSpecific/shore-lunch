import { useShoppingCart } from 'use-shopping-cart';

const CartScrim = () => {
  const { handleCloseCart, shouldDisplayCart } = useShoppingCart();

  return shouldDisplayCart ? (
    <div onClick={handleCloseCart} className="cartScrim">
      <style jsx>{`
        .cartScrim {
          position: fixed;
          inset: 0;
          background-color: var(--overlay);
        }
      `}</style>
    </div>
  ) : null;
};

export default CartScrim;
