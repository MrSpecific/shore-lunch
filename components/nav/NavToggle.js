import { useNav } from '@hooks';
import { Hamburger } from '@svg';
import styles from '@styles/components/layout/NavToggle.module.css';

// Toggle for activating the mobile nav
const NavToggle = () => {
  const { navIsActive, toggleNav } = useNav();

  return (
    <button className={styles.navToggle} onClick={toggleNav}>
      <Hamburger />
      <span className="visually-hidden">{navIsActive ? 'Close' : 'Open'} Nav Menu</span>
    </button>
  );
};

export default NavToggle;
