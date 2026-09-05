import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { updateInventoryFromSession } from '@lib/commerce';
import { API_VERSION } from '@config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: API_VERSION,
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  // Route Handlers never parse the body, so this is already the raw text
  // Stripe needs to verify the signature -- no bodyParser config needed.
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.log(`❌ Error message: ${errorMessage}`);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  // Successfully constructed event.
  console.log('✅ Success:', event.id);

  let intent: Stripe.PaymentIntent | Stripe.Charge | Stripe.Checkout.Session;
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        intent = event.data.object as Stripe.PaymentIntent;
        console.log(`💰 PaymentIntent status: ${intent.status}`);
        break;
      case 'payment_intent.payment_failed':
        intent = event.data.object as Stripe.PaymentIntent;
        console.log(`❌ Payment failed: ${intent.last_payment_error?.message}`);
        break;
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge;
        console.log(`💵 Charge id: ${charge.id}`);
        break;
      }
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await updateInventoryFromSession({ session, stripe });
        break;
      }
      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown inventory update error';
    console.error(`❌ Webhook processing failed for event ${event.id}: ${errorMessage}`);
    return NextResponse.json({ received: false, message: errorMessage }, { status: 500 });
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ received: true });
}
