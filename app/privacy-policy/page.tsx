import type { Metadata } from 'next';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';

const title = 'Privacy Policy';

export const metadata: Metadata = buildMetadata({
  tags: { metaDescription: 'Terms and Conditions' },
  path: '/privacy-policy',
  pageTitle: title,
});

export default function PrivacyPolicy() {
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
