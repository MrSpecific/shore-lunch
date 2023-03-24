import { useAppContext } from '@lib/context/app';
import { Header, Footer, Layout, SkipLink } from '@layout';
import MiniCart from '@components/MiniCart';

const { log } = console;

export const GlobalStyles = () => {
  const { headerHeight } = useAppContext();

  return (
    <>
      <style jsx global>{`
        :root {
          --header-height: ${headerHeight}px;
        }
      `}</style>
    </>
  );
};

export default function Page({ title, metaTags, header = true, headerClass, children }) {
  return (
    <Layout metaTags={metaTags} pageTitle={title}>
      <GlobalStyles />
      <SkipLink />
      {header && <Header className={headerClass} />}
      <main id="main">{children}</main>
      <MiniCart />
      <Footer />
    </Layout>
  );
}
