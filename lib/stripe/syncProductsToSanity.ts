import getStripe, { stripe, formatAmountForDisplay, fetchProducts } from '@lib/stripe';
// import { addOrUpdateProduct, getProducts } from '@lib/sanity';
import transformProduct from '@lib/stripe/transformProduct';

const { log } = console;

export default async function syncProductsToSanity() {
  try {
    const stripeProducts = await fetchProducts();

    // const productsArray = await Promise.all(
    //   stripeProducts.flatMap(async (product) => addOrUpdateProduct(transformProduct(product)))
    // );

    // return productsArray;
  } catch (err) {
    console.error(err);
    return false;
  }
}
