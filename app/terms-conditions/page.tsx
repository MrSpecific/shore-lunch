import type { Metadata } from 'next';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';

const title = 'Terms & Conditions';

export const metadata: Metadata = buildMetadata({
  tags: { metaDescription: 'Terms and Conditions' },
  path: '/terms-conditions',
  pageTitle: title,
});

export default function TermsConditions() {
  return (
    <Page headerClass="header-default">
      <section className="container">
        <div className="content content-no-hero">
          <h1>{title}</h1>
          <section></section>
        </div>
      </section>
    </Page>
  );
}
