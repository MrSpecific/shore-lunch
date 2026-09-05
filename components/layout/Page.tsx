'use client';

import { ReactNode } from 'react';
import { useAppContext } from '@lib/context/app';
import { Header, Footer, SkipLink } from '@layout';
import MiniCart from '@commerce/MiniCart';

export const GlobalStyles = () => {
  const { headerHeight } = useAppContext();

  return (
    <style jsx global>{`
      :root {
        --header-height: ${headerHeight}px;
      }
    `}</style>
  );
};

export default function Page({
  header = true,
  headerClass = null,
  children = null,
}: {
  header?: boolean;
  headerClass?: string | null;
  children?: ReactNode;
}) {
  return (
    <>
      <GlobalStyles />
      <SkipLink />
      {header && <Header className={headerClass} />}
      <main id="main">{children}</main>
      <MiniCart />
      <Footer />
    </>
  );
}
