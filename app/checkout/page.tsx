import type { Metadata } from 'next';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import CheckoutForm from '@commerce/CheckoutForm';

export const metadata: Metadata = buildMetadata({
  tags: { noIndex: true, noFollow: true },
  path: '/checkout',
  pageTitle: 'Checkout',
});

export default function CheckoutPage() {
  return (
    <Page>
      <div className="page-container">
        <h1>Checkout</h1>
        <p>Complete your order.</p>
        <CheckoutForm />
      </div>
    </Page>
  );
}
