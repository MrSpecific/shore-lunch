'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

import { useAppContext } from '@lib/context/app';
import styles from '@styles/nav/NavItem.module.css';

// Single Nav Item
const NavItem = ({
  path,
  children,
  className,
  clickHandler = () => {},
}: {
  path: string;
  children?: ReactNode;
  className?: string;
  clickHandler?: () => void;
}) => {
  const pathname = usePathname();
  const { setNavIsActive } = useAppContext();

  const ItemClass = classNames({
    [styles.navItem]: true,
    [styles.current]: path === pathname,
    [className || '']: !!className,
  });

  const handleClick = () => {
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
