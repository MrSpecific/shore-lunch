import { useContext, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { AppContext, AppContextProvider, CartProvider } from '@context';
import { KlaviyoEmbedOriginal } from '@lib/klaviyo';
import { AnalyticsTags } from '@layout';
// import { availableProducts } from '@data/products';
import Cart from '@commerce/Cart';
import '../styles/globals.css';

const AppData = ({ data }) => {
  const { setGlobalData } = useContext(AppContext);

  useEffect(() => {
    if (data) setGlobalData(data);
  }, [setGlobalData, data]);
};

function MyApp({ Component, pageProps, data, products }) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <AppContextProvider>
      <CartProvider>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <AnalyticsTags />
        <AppData data={data} products={products} />
        <Cart>
          <Component {...pageProps} />
        </Cart>

        <Analytics />
        {/* <KlaviyoEmbedOriginal formId="QTmyHD" /> */}
      </CartProvider>
    </AppContextProvider>
  );
}

export async function getServerSideProps() {
  const products = await availableProducts();

  return { props: { products } };
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // NOTE: Fetch data here:
  const data = {};

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, data };
};

export default MyApp;
