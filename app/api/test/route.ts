import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { adminClient } from '@lib/sanity';
import { API_VERSION } from '@config';

interface UpdateProductInventory {
  id: string;
  sku: string | boolean;
  quantity: number;
}

const updateSkuInventory = async ({ id, sku, quantity }: UpdateProductInventory) => {
  try {
    const product = await adminClient.getDocument(id); // Document ID to patch

    const skuIndex = product?.variants.findIndex((item: any) => item.sku === sku);

    if (skuIndex === -1 || skuIndex === undefined) return false;

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
        .dec({ inventory: 1 })
        .commit(); // Perform the patch and return a promise
    } catch (error) {
      console.log(error);
    }
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: API_VERSION,
});

export async function GET() {
  const lineItems = await stripe.checkout.sessions.listLineItems(
    'cs_test_b16kdI8aqtuYLSbb3ZvJT7ncPTQJQ1VGOLrEzLsjajACqES8Uqh53hdVpO',
    { limit: 10, expand: ['data.price.product'] }
  );

  testUpdateProductInventory({
    id: '0dcedaae-9da5-4b3f-a8fa-7fdea31b566d',
    sku: 'blue',
    quantity: 1,
  });

  return NextResponse.json({ lineItems });
}
