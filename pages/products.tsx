import { NextPage } from 'next';
// import useSWR from 'swr';

import { Page } from '@layout';
// import { availableProducts } from '@data/products';
import Cart from '@commerce/Cart';
import CartSummary from '@commerce/CartSummary';
import ProductGrid from '@components/commerce/ProductGrid';
import { useAppContext } from '@context';

const ProductsPage: NextPage = () => {
  // const products = await availableProducts();
  // @ts-ignore
  const { products } = useAppContext();

  // console.log(products);

  return (
    <Page title="Shopping Cart | Next.js + TypeScript Example">
      <div className="content content-y">
        <h1>Merchandise</h1>
        {/* <Cart> */}
        <div style={{ marginTop: 'var(--spacer-m)', marginBottom: 'var(--spacer-m)' }}>
          <ProductGrid products={products} />
        </div>
        <hr />
        <CartSummary />
        {/* </Cart> */}
      </div>
    </Page>
  );
};

export default ProductsPage;
