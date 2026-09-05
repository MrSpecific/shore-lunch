'use client';

import { useNav } from '@hooks';
import { Hamburger } from '@svg';
import css from '@styles/nav/NavToggle.module.css';

// Toggle for activating the mobile nav
export const NavToggle = () => {
  const { navIsActive, toggleNav } = useNav();

  return (
    <button className={css.navToggle} onClick={toggleNav}>
      <Hamburger />
      <span className="visually-hidden">{navIsActive ? 'Close' : 'Open'} Nav Menu</span>
    </button>
  );
};

export default NavToggle;
