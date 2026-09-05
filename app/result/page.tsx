import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import ResultContent from './ResultContent';

export const metadata: Metadata = buildMetadata({
  tags: { noIndex: true, noFollow: true },
  path: '/result',
  pageTitle: 'Order Receipt',
});

export default function ResultPage() {
  return (
    <Page>
      <Suspense fallback={null}>
        <ResultContent />
      </Suspense>
    </Page>
  );
}
