import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT, API_VERSION } from '@config';
import { formatAmountForStripe } from '@lib/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: API_VERSION,
});

export async function POST(req: NextRequest) {
  const { amount }: { amount: number } = await req.json();

  try {
    // Validate the amount that was passed from the client.
    if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
      throw new Error('Invalid amount.');
    }

    // Create Checkout Sessions from body params.
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: 'donate',
      payment_method_types: ['card'],
      line_items: [
        {
          price: formatAmountForStripe(amount, CURRENCY).toString(),
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/donate-with-checkout`,
    };

    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
      params
    );

    return NextResponse.json(checkoutSession);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ statusCode: 500, message: errorMessage }, { status: 500 });
  }
}
