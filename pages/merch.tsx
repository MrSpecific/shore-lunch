import { NextPage } from 'next';
// import useSWR from 'swr';

import { Page } from '@layout';
import { availableProducts } from '@data/products';
import { fetchProducts } from '@lib/swell';
import Cart from '@commerce/Cart';
import CartSummary from '@commerce/CartSummary';
import ProductGrid from '@components/commerce/ProductGrid';
import { useAppContext } from '@context';

const ProductsPage: NextPage<{ products: Array<any>; swellProducts: any }> = ({
  products,
  swellProducts,
}) => {
  return (
    <Page title="Merchandise">
      <div className="content content-y">
        <h1>Merch.</h1>
        {/* {JSON.stringify(swellProducts)} */}
        <div style={{ marginTop: 'var(--spacer-m)', marginBottom: 'var(--spacer-m)' }}>
          <ProductGrid {...swellProducts} />
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
  const swellProducts = await fetchProducts();

  return {
    props: {
      products,
      swellProducts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1200, // In seconds
  };
}
