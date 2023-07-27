import { client } from '@lib/sanity';

const { log } = console;

const updateProductInventory = async ({ id, sku = false, quantity }) => {
  try {
    await client
      .patch(id) // Document ID to patch
      // .set({ vote }) // Shallow merge
      // .set({ lastSold:  }) // Shallow merge
      .dec({ voteCount: 1 }) // Increment field by count
      .commit() // Perform the patch and return a promise
      .then((updatedProduct) => {
        console.log('Hurray, the product is updated! New document:');
        console.log(updatedProduct);
      })
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message);
      });
  } catch (error) {
    console.log(error);
  }
};

export default async function updateInventoryFromSession({ session, stripe }) {
  if (!session) return false;

  const { id } = session;

  const lineItems = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ['data.price.product'] },
    function (err, lineItems) {
      // asynchronously called
      log('Async response lineItems', lineItems);
    }
  );

  log(`💵 webhook lineItems: ${JSON.stringify(lineItems)}`);
  // log(`💵 Checkout Session: ${JSON.stringify(session)}`);
  return true;
}
