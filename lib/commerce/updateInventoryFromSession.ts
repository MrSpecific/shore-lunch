import { client } from '@lib/sanity';
import { updateProductInventory } from './updateProductInventory';

const { log } = console;

export default async function updateInventoryFromSession({ session, stripe }) {
  if (!session) return false;

  const { id } = session;

  const lineItems = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ['data.price.product'] },
    function (err, lineItems) {
      // asynchronously called
      // log('Async response lineItems', JSON.stringify(lineItems, null, 2));
      lineItems.data.forEach(async ({ quantity, price }) => {
        const { parentId, sku, hasVariants } = price?.product?.metadata;
        const cleanSku = sku.toLowerCase() === 'false' ? false : sku;

        // log('Updating inventory for', price?.product?.metadata);
        updateProductInventory({ id: parentId, sku: cleanSku, quantity });
      });
    }
  );

  // log(`💵 webhook lineItems: ${JSON.stringify(lineItems)}`);
  // log(`💵 Checkout Session: ${JSON.stringify(session)}`);
  return true;
}
