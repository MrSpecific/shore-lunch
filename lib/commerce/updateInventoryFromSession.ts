const { log } = console;

export default async function updateInventoryFromSession({ session, stripe }) {
  if (!session) return false;

  const { id } = session;

  const lineItems = await stripe.checkout.sessions.listLineItems(
    id,
    { limit: 5 },
    function (err, lineItems) {
      // asynchronously called
      log(lineItems);
    }
  );

  log(`💵 lineItems: ${JSON.stringify(lineItems)}`);
  log(`💵 Checkout Session: ${JSON.stringify(session)}`);
  return true;
}
