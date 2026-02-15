import Stripe from 'stripe';
import { updateProductInventory } from './updateProductInventory';

interface UpdateInventoryFromSessionArgs {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}

const parseSku = (sku: unknown): string | boolean => {
  if (typeof sku !== 'string') return false;
  if (!sku.length || sku.toLowerCase() === 'false') return false;
  return sku;
};

export default async function updateInventoryFromSession({
  session,
  stripe,
}: UpdateInventoryFromSessionArgs) {
  if (!session) return false;

  const { id } = session;

  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ['data.price.product'],
  });

  const updates = lineItems.data.map(async ({ quantity, price }, index) => {
    const product = price?.product as Stripe.Product | string | null;
    if (!product || typeof product === 'string') {
      throw new Error(`Missing expanded Stripe product for checkout session "${id}" at line ${index}`);
    }

    const parentId = product.metadata?.parentId;
    if (!parentId) {
      throw new Error(`Missing parentId metadata for checkout session "${id}" at line ${index}`);
    }

    const normalizedQuantity = Number(quantity ?? 0);
    if (!Number.isFinite(normalizedQuantity) || normalizedQuantity <= 0) {
      throw new Error(`Invalid quantity "${quantity}" for checkout session "${id}" at line ${index}`);
    }

    const sku = parseSku(product.metadata?.sku);

    await updateProductInventory({
      id: parentId,
      sku,
      quantity: normalizedQuantity,
    });
  });

  await Promise.all(updates);

  // log(`💵 webhook lineItems: ${JSON.stringify(lineItems)}`);
  // log(`💵 Checkout Session: ${JSON.stringify(session)}`);
  return true;
}
