import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Cors from 'micro-cors';
import Stripe from 'stripe';

import { updateInventoryFromSession } from '@lib/commerce';
import { client, adminClient } from '@lib/sanity';
import { API_VERSION } from '@config';

interface UpdateProductInventory {
  id: string;
  sku: string | boolean;
  quantity: number;
}

const updateSkuInventory = async ({ id, sku, quantity }: UpdateProductInventory) => {
  let product;

  try {
    product = await adminClient.getDocument(id); // Document ID to patch

    const skuIndex = product.variants.findIndex((item) => item.sku === sku);

    if (skuIndex === -1) return false;

    const updatedProduct = adminClient
      .patch(id) // Document ID to patch
      .dec({ [`variants[${skuIndex}].inventory`]: quantity })
      .commit(); // Perform the patch and return a promise

    return updatedProduct;
  } catch (error) {
    console.log(error);
  }
};

const testUpdateProductInventory = async ({
  id,
  sku = false,
  quantity,
}: UpdateProductInventory) => {
  if (sku) {
    updateSkuInventory({ id, sku, quantity });
  } else {
    try {
      await adminClient
        .patch(id) // Document ID to patch
        .dec({ [`inventory`]: 1 })
        .commit(); // Perform the patch and return a promise
      // .then((updatedProduct) => {
      //   console.log('Hurray, the product is updated! New document:');
      //   console.log(updatedProduct);
      // })
      // .catch((err) => {
      //   console.error('Oh no, the update failed: ', err.message);
      // });
    } catch (error) {
      console.log(error);
    }
  }
};

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

  testUpdateProductInventory({
    // id: 'drafts.0dcedaae-9da5-4b3f-a8fa-7fdea31b566d',
    id: '0dcedaae-9da5-4b3f-a8fa-7fdea31b566d',
    sku: 'blue',
    quantity: 1,
  });

  res.json({ lineItems: lineItems });
};

export default cors(webhookHandler as any);
