import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
// import { validateCartItems } from 'use-shopping-cart/utilities/serverless';
import { validateCartItems } from 'use-shopping-cart/utilities';
// import validateCart from '@lib/validateCart';
import { availableProducts, availableProductsWithSKU } from '@data/products';
import getShippingRates from '@lib/shipping';
import { ALLOWED_COUNTRIES, API_VERSION } from '@config';

const { log, warn } = console;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: API_VERSION,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const inventory = await availableProducts();
  const inventorySkus = await availableProductsWithSKU();

  // console.log('inventory', inventory);
  // console.log('inventorySkus', inventorySkus);

  if (req.method === 'POST') {
    try {
      // Validate the cart details that were sent from the client.
      // console.log('cart', req.body);
      // const lineItems = validateCart({ cart: req.body, inventory });
      const line_items = validateCartItems(inventorySkus as any, req.body);

      // console.log('line_items', JSON.stringify(line_items, null, 2));

      const hasSubscription =
        line_items &&
        line_items.find((item) => {
          return !!item.price_data.recurring;
        });

      const shipping_options = await getShippingRates({ cart: req.body });

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ALLOWED_COUNTRIES as any,
          // allowed_countries: ['US', 'CA'],
        },
        // shipping_options,
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        mode: hasSubscription ? 'subscription' : 'payment',
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      warn(err);
      const errorMessage = err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
