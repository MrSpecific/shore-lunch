import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
import { validateCartItems } from 'use-shopping-cart/utilities';
import { availableProductsWithSKU } from '@data/products';
import { ALLOWED_COUNTRIES, API_VERSION } from '@config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: API_VERSION,
});

export async function POST(req: NextRequest) {
  const inventorySkus = await availableProductsWithSKU();
  const cart = await req.json();

  try {
    // Validate the cart details that were sent from the client.
    const line_items = validateCartItems(inventorySkus as any, cart);

    const hasSubscription =
      line_items &&
      line_items.find((item) => {
        return !!item.price_data.recurring;
      });

    // Create Checkout Sessions from body params.
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ALLOWED_COUNTRIES as any,
      },
      line_items,
      success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cart`,
      mode: hasSubscription ? 'subscription' : 'payment',
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession);
  } catch (err) {
    console.warn(err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ statusCode: 500, message: errorMessage }, { status: 500 });
  }
}
