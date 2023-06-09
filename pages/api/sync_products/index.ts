import getStripe, { stripe, formatAmountForDisplay, fetchProducts } from '@lib/stripe';
import syncProductsToSanity from '@lib/stripe/syncProductsToSanity';

const { log } = console;

async function handler(req, res) {
  // if (req.method !== 'POST') return res.status(400).send('Bad request');

  const productsArray = await syncProductsToSanity();

  return res.status(200).send(productsArray);
}

export default handler;
