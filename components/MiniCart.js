import { useShoppingCart } from 'use-shopping-cart';
import { motion, AnimatePresence } from 'framer-motion';
import CartItems from '@commerce/CartItems';
import styles from '@styles/components/MiniCart.module.css';

const MiniCart = () => {
  const { handleCartClick, shouldDisplayCart } = useShoppingCart();

  return (
    <AnimatePresence>
      <button onClick={() => handleCartClick(true)}>Toggle Cart</button>
      {shouldDisplayCart && (
        <section className={styles.miniCart}>
          <h2>Your Cart</h2>
          <CartItems />
        </section>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
