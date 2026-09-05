'use client';

import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AppContextProvider, CartContextProvider } from '@context';
import { KlaviyoEmbedOriginal } from '@lib/klaviyoEmbed';
import { AnalyticsTags } from '@layout';
import Cart from '@commerce/Cart';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppContextProvider>
      <CartContextProvider>
        <AnalyticsTags />
        <Cart>{children}</Cart>
        <Analytics />
        <KlaviyoEmbedOriginal formId="" />
      </CartContextProvider>
    </AppContextProvider>
  );
}
