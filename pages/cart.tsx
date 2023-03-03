import { NextPage } from 'next'
import { Page } from '@layout';

import Cart from '@commerce/Cart'
import CartSummary from '@commerce/CartSummary'
import Products from '@commerce/Products'

const DonatePage: NextPage = () => {
  return (
    <Page title="Shopping Cart | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Shopping Cart</h1>
        <p>
          Powered by the{' '}
          <a href="https://useshoppingcart.com">use-shopping-cart</a> React
          hooks library.
        </p>
        <Cart>
          <Products />
          <hr />
          <CartSummary />
        </Cart>
      </div>
    </Page>
  )
}

export default DonatePage
