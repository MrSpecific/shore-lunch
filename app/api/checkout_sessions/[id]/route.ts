import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { API_VERSION } from '@config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: API_VERSION,
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.');
    }

    const checkout_session: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['payment_intent', 'line_items'],
    });

    return NextResponse.json(checkout_session);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ statusCode: 500, message: errorMessage }, { status: 500 });
  }
}
