import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';

import { useNav } from '@hooks';
import { NavList } from '@components/nav';
import { Close } from '@svg';
import styles from '@styles/nav/NavOverlay.module.css';

const Overlay = () => {
  const { navIsActive, setNavIsActive, closeNav } = useNav();

  useEffect(() => {
    const escapeKeyHandler = (e) => {
      if (e.key === 'Escape') {
        closeNav();
      }
    };

    document.addEventListener('keydown', escapeKeyHandler);

    return () => {
      document.removeEventListener('keydown', escapeKeyHandler);
    };
  }, [closeNav, navIsActive, setNavIsActive]);

  return (
    <FocusTrap active={navIsActive} focusTrapOptions={{ allowOutsideClick: true }}>
      <motion.nav
        className={styles.navOverLay}
        key="modal"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ ease: 'easeInOut', duration: 0.15 }}
      >
        <div className={styles.overlayTop}>
          <button className={classNames('button-link', [styles.navClose])} onClick={closeNav}>
            <Close />
          </button>
        </div>

        <NavList className={styles.navList} itemClassName={styles.navItemTopLevel} />
      </motion.nav>
    </FocusTrap>
  );
};

// Top-level Nav component
const NavOverlay = ({ className }) => {
  const { navIsActive } = useNav();

  return <AnimatePresence>{navIsActive && <Overlay />}</AnimatePresence>;
};

export default NavOverlay;
