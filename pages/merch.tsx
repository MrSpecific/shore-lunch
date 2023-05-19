import { NextPage } from 'next';
// import useSWR from 'swr';

import commerce from '@lib/commerce';
import { Page } from '@layout';
import { availableProducts } from '@data/products';
import Cart from '@commerce/Cart';
import CartSummary from '@commerce/CartSummary';
import ProductGrid from '@components/commerce/ProductGrid';
import { useAppContext } from '@context';

const ProductsPage: NextPage<{
  products: Array<any>;
  merchant: Object<any>;
  categories: Array<any>;
}> = ({ products }) => {
  // console.log(merchant);

  return (
    <Page title="Merchandise">
      <div className="content content-y">
        <h1>Merch.</h1>
        <div style={{ marginTop: 'var(--spacer-m)', marginBottom: 'var(--spacer-m)' }}>
          <ProductGrid products={products} />
        </div>
      </div>
    </Page>
  );
};

export default ProductsPage;

export async function getStaticProps() {
  const merchant = await commerce.merchants.about();
  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      merchant: merchant || {},
      categories: categories || [],
      products: products || [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1200, // In seconds
  };
}
