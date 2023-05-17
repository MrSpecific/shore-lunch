import getStripe, { stripe, formatAmountForDisplay, fetchProducts } from '@lib/stripe';
import { addProduct, addOrUpdateProduct, getProducts } from '@lib/sanity';
import transformProduct from '@lib/stripe/transformProduct';

const { log } = console;

async function handler(req, res) {
  // if (req.method !== 'POST') return res.status(400).send('Bad request');

  const results = {
    updatedProducts: [],
  };
  const stripeProducts = await fetchProducts();
  // const sanityProducts = await getProducts();

  // stripeProducts.reduce(async (previousPromise, product) => {
  //   await previousPromise;

  //   // log('product: ', product);

  //   // return addProduct(transformProduct(product)).then((res) => {
  //   // return addOrUpdateProduct(transformProduct(product));
  //   return addOrUpdateProduct(transformProduct(product)).then((res) => {
  //     log('addOrUpdateProduct result: ', res);
  //     results.updatedProducts.push(res);
  //   });
  // }, Promise.resolve());

  const productsArray = await Promise.all(
    stripeProducts.flatMap(async (product) => addOrUpdateProduct(transformProduct(product)))
  );
  // log('result: ', await result);

  // stripeProducts.map((product) => {
  //   console.log(product);
  // });

  // return res.status(200).send({ ...stripeProducts, ...sanityProducts, result });
  // return res.status(200).send({ ...stripeProducts, result });
  return res.status(200).send(productsArray);
  // return res.status(200).send({ ...stripeProducts });
}

export default handler;
