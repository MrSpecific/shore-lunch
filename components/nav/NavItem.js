import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

import { useAppContext } from '@lib/context/app';
import styles from '@styles/nav/NavItem.module.css';

// Single Nav Item
const NavItem = ({ path, children, className, clickHandler = () => {} }) => {
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

export default NavItem;
