import Document, { Html, Head, Main, NextScript } from 'next/document';
import FontImports from '@utils/FontImports';

import { KlaviyoScriptTag } from '@lib/klaviyo';

const Body = ({ children }) => {
  return <body>{children}</body>;
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={process.env.NEXT_PUBLIC_LANG || 'en'}>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <FontImports />
          <KlaviyoScriptTag />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
}

export default MyDocument;
