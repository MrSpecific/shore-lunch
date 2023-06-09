import { useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';

import CartItems from '@commerce/CartItems';
import CartSummary from '@commerce/CartSummary';
import CloseIcon from '@svg/close.svg';
import styles from '@styles/components/MiniCart.module.css';

const MiniCartContents = () => {
  const { handleCloseCart } = useShoppingCart();

  useEffect(() => {
    const escapeKeyHandler = (e) => {
      if (e.key === 'Escape') {
        handleCloseCart();
      }
    };

    document.addEventListener('keydown', escapeKeyHandler);

    return () => {
      document.removeEventListener('keydown', escapeKeyHandler);
    };
  }, [handleCloseCart]);

  return (
    <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
      <motion.section
        className={styles.miniCart}
        key="modal"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
      >
        <div className={styles.cartHeader}>
          <h2>Your Cart.</h2>
          <button className={styles.closeCart} onClick={() => handleCloseCart()}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.cartBody}>
          <CartItems />
        </div>
        <div className={styles.cartFooter}>
          <CartSummary />
        </div>
      </motion.section>
    </FocusTrap>
  );
};

const MiniCart = () => {
  const { shouldDisplayCart } = useShoppingCart();

  return <AnimatePresence>{shouldDisplayCart && <MiniCartContents />}</AnimatePresence>;
};

export default MiniCart;
