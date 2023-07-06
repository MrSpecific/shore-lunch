import { NextPage } from 'next';
// import useSWR from 'swr';

import { Page } from '@layout';
import { availableProducts } from '@data/products';
import CartSummary from '@commerce/CartSummary';
import ProductGrid from '@components/commerce/ProductGrid';
import { useAppContext } from '@context';

const ProductsPage: NextPage<{ products: Array<any> }> = ({ products }) => {
  return (
    <Page title="Merchandise">
      <div className="content content-y">
        <h1>Merch.</h1>
        <div style={{ marginTop: 'var(--spacer-m)', marginBottom: 'var(--spacer-m)' }}>
          <ProductGrid products={products} />
        </div>
        <hr />
        <CartSummary />
      </div>
    </Page>
  );
};

export default ProductsPage;

export async function getStaticProps() {
  const products = await availableProducts();

  return {
    props: {
      products,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1200, // In seconds
  };
}
