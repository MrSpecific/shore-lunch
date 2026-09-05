import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT, API_VERSION } from '@config';
import { formatAmountForStripe } from '@lib/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: API_VERSION,
});

export async function POST(req: NextRequest) {
  const { amount, payment_intent_id }: { amount: number; payment_intent_id?: string } =
    await req.json();

  // Validate the amount that was passed from the client.
  if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
    return NextResponse.json({ statusCode: 400, message: 'Invalid amount.' }, { status: 500 });
  }

  if (payment_intent_id) {
    try {
      const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
      // If PaymentIntent has been created, just update the amount.
      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
          amount: formatAmountForStripe(amount, CURRENCY),
        });
        return NextResponse.json(updated_intent);
      }
    } catch (e) {
      if ((e as any).code !== 'resource_missing') {
        const errorMessage = e instanceof Error ? e.message : 'Internal server error';
        return NextResponse.json({ statusCode: 500, message: errorMessage }, { status: 500 });
      }
    }
  }

  try {
    // Create PaymentIntent from body params.
    const params: Stripe.PaymentIntentCreateParams = {
      amount: formatAmountForStripe(amount, CURRENCY),
      currency: CURRENCY,
      description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? '',
      automatic_payment_methods: {
        enabled: true,
      },
    };
    const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params);

    return NextResponse.json(payment_intent);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ statusCode: 500, message: errorMessage }, { status: 500 });
  }
}
