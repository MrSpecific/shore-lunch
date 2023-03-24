import { useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { motion, AnimatePresence } from 'framer-motion';
import CartItems from '@commerce/CartItems';
import CartSummary from '@commerce/CartSummary';
import styles from '@styles/components/MiniCart.module.css';

const MiniCart = () => {
  const { handleCartClick, shouldDisplayCart } = useShoppingCart();

  useEffect(() => {
    const escapeKeyHandler = (e) => {
      if (e.key === 'Escape') {
        handleCartClick(false);
      }
    };

    document.addEventListener('keydown', escapeKeyHandler);

    return () => {
      document.removeEventListener('keydown', escapeKeyHandler);
    };
  }, []);

  return (
    <AnimatePresence>
      <button onClick={() => handleCartClick(true)}>Toggle Cart</button>

      {shouldDisplayCart && (
        <motion.section
          className={styles.miniCart}
          key="modal"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <h2>Your Cart</h2>
          <CartItems />
          <CartSummary />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
