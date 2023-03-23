import { motion, AnimatePresence } from 'framer-motion';
import CartItems from '@commerce/CartItems';
import styles from '@styles/components/MiniCart.module.css';

const MiniCart = () => {
  return (
    <section className={styles.miniCart}>
      <CartItems />
    </section>
  );
};

export default MiniCart;
