import type { Metadata } from 'next';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import CartItems from '@commerce/CartItems';
import CartSummary from '@commerce/CartSummary';

export const metadata: Metadata = buildMetadata({
  tags: { noIndex: true, noFollow: true },
  path: '/cart',
  pageTitle: 'Cart',
});

export default function CartPage() {
  return (
    <Page>
      <div className="content content-y">
        <h1>Shopping Cart</h1>
        <CartItems />
        <hr />
        <CartSummary />
      </div>
    </Page>
  );
}
