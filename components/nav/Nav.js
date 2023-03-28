import classNames from 'classnames';
import { NavList } from '@components/nav';
import styles from '@styles/components/layout/Nav.module.css';

// Top-level Nav component
const Nav = ({ className }) => {
  const navClass = classNames({
    [styles.primaryNav]: true,
    [className]: !!className,
  });

  return (
    <nav className={navClass}>
      <NavList className={styles.primaryNavList} itemClassName={styles.navItemTopLevel} />
    </nav>
  );
};

export default Nav;
