import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';

import CartItems from '@commerce/CartItems';
import CartSummary from '@commerce/CartSummary';
import { useCartDispatch, useCartState, useCartMeta } from '@context/cart';
import CloseIcon from '@svg/close.svg';
import styles from '@styles/components/MiniCart.module.css';

const MiniCartContents = () => {
  const { closeCart } = useCartMeta();

  useEffect(() => {
    const escapeKeyHandler = (e) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    document.addEventListener('keydown', escapeKeyHandler);

    return () => {
      document.removeEventListener('keydown', escapeKeyHandler);
    };
  }, [closeCart]);

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
          <button className={styles.closeCart} onClick={() => closeCart()}>
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
  // const { shouldDisplayCart } = useShoppingCart();
  const { shouldDisplayCart } = useCartMeta();

  return <AnimatePresence>{shouldDisplayCart && <MiniCartContents />}</AnimatePresence>;
};

export default MiniCart;
