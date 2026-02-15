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
  description = null,
  noIndex = false,
  noFollow = false,
  metaTags = {},
  header = true,
  headerClass = null,
  children = null,
}) {
  const mergedMetaTags = {
    ...metaTags,
    ...(description ? { metaDescription: description } : {}),
    ...(noIndex ? { noIndex: true } : {}),
    ...(noFollow ? { noFollow: true } : {}),
  };

  return (
    <Layout metaTags={mergedMetaTags} pageTitle={title}>
      <GlobalStyles />
      <SkipLink />
      {header && <Header className={headerClass} />}
      <main id="main">{children}</main>
      <MiniCart />
      <Footer />
    </Layout>
  );
}
