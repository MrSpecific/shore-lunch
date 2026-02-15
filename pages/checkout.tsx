import { NextPage } from 'next'
import { Page } from '@layout';

import CheckoutForm from '@commerce/CheckoutForm'

const DonatePage: NextPage = () => {
  return (
    <Page title="Checkout" noIndex noFollow>
      <div className="page-container">
        <h1>Checkout</h1>
        <p>Complete your order.</p>
        <CheckoutForm />
      </div>
    </Page>
  )
}

export default DonatePage
