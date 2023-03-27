import { useAppContext } from '@lib/context/app';
import { Header, Footer, Layout, SkipLink } from '@layout';
import MiniCart from '@commerce/MiniCart';

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

export default function Page({
  title = null,
  metaTags = {},
  header = true,
  headerClass = null,
  children = null,
}) {
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
