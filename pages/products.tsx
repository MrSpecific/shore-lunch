import { NextPage } from 'next';
import { Page } from '@layout';

import Cart from '@commerce/Cart';
import CartSummary from '@commerce/CartSummary';
import Products from '@commerce/Products';

const DonatePage: NextPage = () => {
  return (
    <Page title="Shopping Cart | Next.js + TypeScript Example">
      <div className="content content-y">
        <h1>Merchandise</h1>
        {/* <Cart> */}
        <Products />
        <hr />
        <CartSummary />
        {/* </Cart> */}
      </div>
    </Page>
  );
};

export default DonatePage;
