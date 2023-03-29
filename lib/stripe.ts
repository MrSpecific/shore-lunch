import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { API_VERSION } from '@config';

// Load Stripe Script
let stripePromise = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};

export default getStripe;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: API_VERSION,
});

export function formatAmountForDisplay(amount: number, currency: string): string {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount);
}

export function formatAmountForStripe(amount: number, currency: string): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;

  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export function formatAmountFromStripe(amount: number, currency: string): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount / 100);
}

export const fetchProducts = async () => {
  let products = [];

  getProducts: try {
    // const result = await stripe.products.list({
    //   limit: 3,
    // });
    console.log('trying to fetch using: ', process.env.STRIPE_SECRET_KEY);
    const result = await stripe.products.list();
    console.log('tripe.products.list complete');

    if (!result || !result.data || !result.data.length) break getProducts;

    const productArray = result.data;

    const pricingResult = await Promise.allSettled(
      productArray.map(async (product: Stripe.Product) => {
        const price = await stripe.prices.retrieve(product.default_price.toString());
        console.log('stripe.prices.retrieve complete', product.default_price);
        // console.log(price);

        return {
          ...product,
          default_price: price,
          image: product.images[0],
          price: price.unit_amount,
          currency: price.currency,
        };
      })
    );

    products = pricingResult.reduce((acc, result) => {
      if (result.status != 'fulfilled') return acc;
      return [...acc, result.value];
    }, []);
  } catch (error) {
    console.error('Problem fetching products', error);
  }

  return products;
};

const sortShippingRates = (a, b) => {
  const rateA = a?.shipping_rate_data?.fixed_amount?.amount;
  const rateB = b?.shipping_rate_data?.fixed_amount?.amount;

  if (rateA < rateB) return -1;
  if (rateA > rateB) return 1;
  return 0;
};

export const fetchShippingRates = async () => {
  let shippingRates = [];

  getRates: try {
    const stripeShippingRates = await stripe.shippingRates.list();

    if (!stripeShippingRates.data) break getRates;

    shippingRates = stripeShippingRates.data.map(
      ({ active, type, fixed_amount, display_name, delivery_estimate }) => {
        if (!active) return;

        return {
          shipping_rate_data: {
            type,
            fixed_amount,
            display_name,
            delivery_estimate,
          },
        };
      }
    );

    shippingRates.sort(sortShippingRates);
    console.log(shippingRates);

    shippingRates = shippingRates.filter(
      (rate) => rate.shipping_rate_data.fixed_amount?.amount > 0
    );

    console.log(shippingRates);
    // shippingRates = sortShippingRates(shippingRatesObj);
  } catch {
    console.error('Problem fetching shipping rates');
  }

  return shippingRates;
};
