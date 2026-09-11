'use client';

import { ReactNode, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

import siteInfo from '@/lib/siteInfo';
import { useAppContext } from '@context/app';
import { useBreakpoint } from '@hooks';
import { Nav, NavOverlay, NavToggle } from '@/components/nav';
import { CartControl } from '@/components/commerce/CartControl';
import { AccountControl } from '@/components/account/AccountControl';
import { ShoreLunchLogoMinimal } from '@svg';
import css from '@/styles/layout/Header.module.css';

const Header = ({
  className,
  children = null,
}: {
  className?: string | null;
  children?: ReactNode;
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDown, setScrollDown] = useState(true);
  const { navIsActive, setNavIsActive, headerHeight, setHeaderHeight } = useAppContext();
  const ref = useRef<HTMLElement>(null);

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
    setHeaderHeight(ref.current?.clientHeight ?? null);
  }, [headerHeight, setHeaderHeight, ref]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerClass = classNames({
    [css.header]: true,
    [css.navIsActive]: navIsActive,
    [css.notAtTop]: scrollPosition > 600,
    [css.scrollDown]: scrollDown,
    [css.scrollUp]: !scrollDown,
    [className || '']: !!className,
  });

  const handleHeaderLinkClick = () => {
    clearAllBodyScrollLocks();
    setNavIsActive(false);
  };

  return (
    <>
      <header className={headerClass} ref={ref}>
        <section className="content header-wrapper">
          <div className={classNames(['container', css.headerInner])}>
            <Link
              href="/"
              className={classNames(css.logoLink, 'header-logo-link')}
              onClick={handleHeaderLinkClick}
            >
              <ShoreLunchLogoMinimal className={css.headerLogo} />
              <span className="visually-hidden">{siteInfo.title}</span>
            </Link>
            <div className={css.headerMiddle}>
              {children && <div>{children}</div>}
              <Nav />
            </div>
            <div className={css.headerControls}>
              <AccountControl />
              <CartControl />
              <NavToggle />
            </div>
          </div>
        </section>
      </header>
      <NavOverlay />
    </>
  );
};

export default Header;
