import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import FontImports from '@utils/FontImports';
import { KlaviyoScriptTag } from '@lib/klaviyoEmbed';
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
        <ClerkProvider
          localization={{
            signIn: {
              start: {
                title: `Sign in to ${siteInfo.title}`,
                titleCombined: `Sign in to ${siteInfo.title}`,
              },
            },
          }}
        >
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
