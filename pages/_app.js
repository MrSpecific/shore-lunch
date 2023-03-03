import { useContext, useEffect } from 'react';
import Head from 'next/head';
import { AppContext, AppContextProvider } from '@context';
import { KlaviyoEmbedOriginal } from '@lib/klaviyo';
import AnalyticsTags from '@lib/analytics';
import '../styles/globals.css';

const AppData = ({ data }) => {
  const { setGlobalData } = useContext(AppContext);

  useEffect(() => {
    if (data) setGlobalData(data);
  }, [setGlobalData, data]);
};

function MyApp({ Component, pageProps, data }) {
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
      <AppData data={data} />
      <Component {...pageProps} />
      <KlaviyoEmbedOriginal formId="QTmyHD" />
    </AppContextProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // TODO: Fetch data here:
  const data = {};

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, data };
};

export default MyApp;
