import { useContext, useEffect } from 'react';
import Head from 'next/head';
import { AppContext, AppContextProvider } from '@context';
import { KlaviyoEmbedOriginal } from '@lib/klaviyo';
import AnalyticsTags from '@lib/analytics';
import { availableProducts } from '@data/products';
import Cart from '@commerce/Cart';
import '../styles/globals.css';

const AppData = ({ data, products }) => {
  const { setGlobalData, setProducts } = useContext(AppContext);

  useEffect(() => {
    if (data) setGlobalData(data);
    if (products) setProducts(products);
  }, [setGlobalData, data, setProducts, products]);
};

function MyApp({ Component, pageProps, data, products }) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <AppContextProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AnalyticsTags />
      <AppData data={data} products={products} />
      <Cart>
        <Component {...pageProps} />
      </Cart>
      <KlaviyoEmbedOriginal formId="QTmyHD" />
    </AppContextProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // NOTE: Fetch data here:
  const data = {};
  const products = await availableProducts();

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, data, products };
};

export default MyApp;
