import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

import siteInfo from '@lib/siteInfo';
import { useAppContext } from '@context/app';
import { useBreakpoint } from '@hooks';
import { Nav, NavOverlay, NavToggle } from '@components/nav';
import CartControl from '@commerce/CartControl';
import { ShoreLunchLogoMinimal } from '@svg';
import styles from '@styles/layout/Header.module.css';

const { log } = console;

const Header = ({ className, children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDown, setScrollDown] = useState(true);
  const { navIsActive, setNavIsActive, headerHeight, setHeaderHeight } = useAppContext();
  const ref = useRef(null);

  const [breakpoint] = useBreakpoint(ref);

  const handleScroll = () => {
    const position = window.pageYOffset;

    if (position !== scrollPosition) {
      setScrollPosition((prevPosition) => {
        setScrollDown(position > prevPosition);
        return position;
      });
    }
  };

  useEffect(() => {
    setHeaderHeight(ref.current.clientHeight);
  }, [headerHeight, setHeaderHeight, ref]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerClass = classNames({
    [styles.header]: true,
    [styles.navIsActive]: navIsActive,
    [styles.notAtTop]: scrollPosition > 600,
    [styles.scrollDown]: scrollDown,
    [styles.scrollUp]: !scrollDown,
    [className]: !!className,
  });

  const handleHeaderLinkClick = () => {
    clearAllBodyScrollLocks();
    setNavIsActive(false);
  };

  return (
    <>
      <header className={headerClass} ref={ref}>
        <section className="content header-wrapper">
          <div className={classNames(['container', styles.headerInner])}>
            <Link
              href="/"
              className={classNames(styles.logoLink, 'header-logo-link')}
              onClick={handleHeaderLinkClick}
            >
              <ShoreLunchLogoMinimal className={styles.headerLogo} />
              <span className="visually-hidden">{siteInfo.title}</span>
            </Link>
            <div className={styles.headerMiddle}>
              {children && <div>{children}</div>}
              <Nav />
            </div>
            <CartControl />
            <NavToggle />
          </div>
        </section>
      </header>
      <NavOverlay />
      {/* {breakpoint === 'small' && <Nav className={styles.mobileNav} />} */}
    </>
  );
};

export default Header;
