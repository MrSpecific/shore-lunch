import getStripe, { stripe, formatAmountForDisplay } from '@lib/stripe';

async function handler(req, res) {
  // if (req.method !== 'POST') return res.status(400).send('Bad request');

  const body = req.body;

  // const stripe = await getStripe();
  let products = [];

  getProducts: try {
    // const result = await stripe.products.list({
    //   limit: 3,
    // });
    const result = await stripe.products.list();
    console.log('result is ', result);
    if (!result || !result.data || !result.data.length) break getProducts;

    const productArray = result.data;
    // console.log(productArray);

    console.log('Products loop...');

    products = await Promise.all(
      result.data.map(async (product) => {
        // console.log('product', product);
        const price = await stripe.prices.retrieve(product.default_price);
        return { ...product, default_price: price };
      })
    );

    console.log(products);
  } catch {
    console.error('Problem fetching products');
  }

  return res.status(200).send(products);
}

export default handler;
