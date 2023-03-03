import { NextPage } from 'next'
import { Page } from '@layout';

import CheckoutForm from '@commerce/CheckoutForm'

const DonatePage: NextPage = () => {
  return (
    <Page>
      <div className="page-container">
        <h1>Donate with Checkout</h1>
        <p>Donate to our project 💖</p>
        <CheckoutForm />
      </div>
    </Page>
  )
}

export default DonatePage
