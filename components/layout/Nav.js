import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import siteInfo from '@lib/siteInfo';
import { useAppContext } from '@lib/context/app';
import Hamburger from '../svg/hamburger.svg';
import CloseIcon from '../svg/close.svg';
import styles from '@styles/components/Nav.module.css';

// Toggle for activating the mobile nav
export const NavToggle = () => {
  const { navIsActive, setNavIsActive } = useAppContext();
  const toggleNav = () => {
    setNavIsActive(!navIsActive);
    navIsActive ? enableBodyScroll(document.body) : disableBodyScroll(document.body);
  };

  return (
    <button className={styles.navToggle} onClick={toggleNav}>
      {navIsActive ? <CloseIcon /> : <Hamburger />}

      <span className="visually-hidden">Toggle Menu</span>
    </button>
  );
};

// Single Nav Item
export const NavItem = ({ path, children, className, clickHandler = () => {} }) => {
  const router = useRouter();
  const { setNavIsActive } = useAppContext();

  const ItemClass = classNames({
    [styles.navItem]: true,
    [styles.current]: path === router.asPath,
    [className]: !!className,
  });

  const handleClick = (e) => {
    clearAllBodyScrollLocks();
    setNavIsActive(false);
    clickHandler();
  };

  return (
    <li className={ItemClass}>
      <Link href={path} className={styles.navItemInner} onClick={handleClick}>
        {children}
      </Link>
    </li>
  );
};

// Top-level Nav component
const Nav = ({ className, breakpoint }) => {
  const { navIsActive, setNavIsActive } = useAppContext();

  const navClass = classNames({
    [styles.primaryNav]: true,
    [styles.active]: navIsActive,
    [className]: !!className,
  });

  useEffect(() => {
    const escapeKeyHandler = (e) => {
      if (e.key === 'Escape') {
        clearAllBodyScrollLocks();
        setNavIsActive(false);
      }
    };

    const resizeHandler = (e) => {
      // Handles the case where user resizes window to desktop size while mobile nav is open
      if (breakpoint !== undefined && breakpoint !== 'small' && navIsActive) {
        clearAllBodyScrollLocks();
        setNavIsActive(false);
      }
    };

    document.addEventListener('keydown', escapeKeyHandler);
    window.addEventListener('resize', resizeHandler);

    return () => {
      document.removeEventListener('keydown', escapeKeyHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [navIsActive, setNavIsActive, breakpoint]);

  return (
    <FocusTrap active={navIsActive} focusTrapOptions={{ allowOutsideClick: true }}>
      <nav className={navClass}>
        <ol className={styles.primaryNavList}>
          {siteInfo.nav.map((item, index) => {
            return (
              <NavItem
                path={item.path}
                className={styles.navItemTopLevel}
                key={`nav-item-${index}`}
              >
                {item.label}
              </NavItem>
            );
          })}
        </ol>
      </nav>
    </FocusTrap>
  );
};

export default Nav;
