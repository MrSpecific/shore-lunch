import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Cors from 'micro-cors';
import Stripe from 'stripe';

import { updateInventoryFromSession } from '@lib/commerce';
import { API_VERSION } from '@config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: API_VERSION,
});

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['GET', 'HEAD'],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lineItems = await stripe.checkout.sessions.listLineItems(
    'cs_test_b16kdI8aqtuYLSbb3ZvJT7ncPTQJQ1VGOLrEzLsjajACqES8Uqh53hdVpO',
    { limit: 10, expand: ['data.price.product'] }
    // function (err, lineItems): any {
    //   // asynchronously called
    //   log(lineItems);
    // }
  );

  res.json({ lineItems: lineItems });
};

export default cors(webhookHandler as any);
