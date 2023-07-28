import { NextPage } from 'next';
import { Page } from '@layout';

import Cart from '@commerce/Cart';
import CartItems from '@commerce/CartItems';
import CartSummary from '@commerce/CartSummary';
import ProductGrid from '@components/commerce/ProductGrid';

const DonatePage: NextPage = () => {
  return (
    <Page title="Shopping Cart | Next.js + TypeScript Example">
      <div className="content content-y">
        <h1>Shopping Cart</h1>
        {/* <Cart> */}
        {/* <ProductGrid /> */}
        <CartItems />
        <hr />
        <CartSummary />
        {/* </Cart> */}
      </div>
    </Page>
  );
};

export default DonatePage;
