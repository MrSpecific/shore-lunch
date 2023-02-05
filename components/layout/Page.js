import { useAppContext } from '@lib/context/app';
import { Header, Footer, Layout, SkipLink } from '@layout';

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

export default function Page({ title, metaTags, headerClass, children }) {
  return (
    <Layout metaTags={metaTags} pageTitle={title}>
      <GlobalStyles />
      <SkipLink />
      <Header className={headerClass} />
      <main id="main">{children}</main>
      <Footer />
    </Layout>
  );
}
