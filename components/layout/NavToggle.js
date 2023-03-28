import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { useAppContext } from '@lib/context/app';
import Hamburger from '@svg/hamburger.svg';
import styles from '@styles/components/layout/NavToggle.module.css';

// Toggle for activating the mobile nav
const NavToggle = () => {
  const { navIsActive, setNavIsActive } = useAppContext();
  const toggleNav = () => {
    setNavIsActive(!navIsActive);
    navIsActive ? enableBodyScroll(document.body) : disableBodyScroll(document.body);
  };

  return (
    <button className={styles.navToggle} onClick={toggleNav}>
      <Hamburger />
      <span className="visually-hidden">{navIsActive ? 'Close' : 'Open'} Nav Menu</span>
    </button>
  );
};

export default NavToggle;
