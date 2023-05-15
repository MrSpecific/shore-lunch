import getStripe, { stripe, formatAmountForDisplay, fetchProducts } from '@lib/stripe';
import { getProducts } from '@lib/sanity';

async function handler(req, res) {
  // if (req.method !== 'POST') return res.status(400).send('Bad request');

  const stripeProducts = await fetchProducts();
  const sanityProducts = await getProducts();

  stripeProducts.map((product) => {
    console.log(product);
  });

  return res.status(200).send({ ...stripeProducts, ...sanityProducts });
}

export default handler;
