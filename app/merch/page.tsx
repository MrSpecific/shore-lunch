import type { Metadata } from 'next';
import { Page } from '@layout';
import { availableProducts } from '@data/products';
import CheckoutButton from '@commerce/CheckoutButton';
import ProductGrid from '@components/commerce/ProductGrid';
import { buildMetadata } from '@lib/seo/metadata';
import styles from '@styles/page/Merch.module.css';

export const revalidate = 120; // REVALIDATE_SECONDS.merch

export const metadata: Metadata = buildMetadata({ path: '/merch', pageTitle: 'Merchandise' });

export default async function MerchPage() {
  const products = await availableProducts();

  return (
    <Page>
      <div className="content content-y">
        <h1>Merch.</h1>
        <div style={{ marginTop: 'var(--spacer-m)', marginBottom: 'var(--spacer-m)' }}>
          <ProductGrid products={products} />
        </div>
        <hr />
        <div style={{ marginTop: 'var(--spacer-m)', display: 'flex', justifyContent: 'center' }}>
          <CheckoutButton includePrice className={styles.checkoutButton} />
        </div>
      </div>
    </Page>
  );
}
