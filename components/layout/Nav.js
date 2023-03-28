import { useEffect } from 'react';
import classNames from 'classnames';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

import siteInfo from '@lib/siteInfo';
import { useAppContext } from '@lib/context/app';
import { NavItem } from '@layout';
import styles from '@styles/components/layout/Nav.module.css';

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
    <nav className={navClass}>
      <ol className={styles.primaryNavList}>
        {siteInfo.nav.map((item, index) => {
          return (
            <NavItem path={item.path} className={styles.navItemTopLevel} key={`nav-item-${index}`}>
              {item.label}
            </NavItem>
          );
        })}
      </ol>
    </nav>
  );
};

export default Nav;
