import type { Metadata, Viewport } from 'next';
import FontImports from '@utils/FontImports';
import { KlaviyoScriptTag } from '@lib/klaviyo';
import siteInfo from '@lib/siteInfo';
import Providers from './providers';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: siteInfo.title,
  description: siteInfo.description,
  icons: { icon: '/images/favicon.png' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={process.env.NEXT_PUBLIC_LANG || 'en'}>
      <head>
        <FontImports />
        <KlaviyoScriptTag />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
