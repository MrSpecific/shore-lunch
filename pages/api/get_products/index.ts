import getStripe, { stripe, formatAmountForDisplay, fetchProducts } from '@lib/stripe';

async function handler(req, res) {
  // if (req.method !== 'POST') return res.status(400).send('Bad request');

  const products = await fetchProducts();

  return res.status(200).send(products);
}

export default handler;
