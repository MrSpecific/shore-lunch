import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
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
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount);
}

export function formatAmountForStripe(amount: number, currency: string): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export function formatAmountFromStripe(amount: number, currency: string): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
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
    const result = await stripe.products.list();

    if (!result || !result.data || !result.data.length) break getProducts;

    const productArray = result.data;

    products = await Promise.allSettled(
      result.data.map(async (product: object) => {
        // console.log('product', product);
        const price = await stripe.prices.retrieve(product.default_price);
        return { ...product, default_price: price };
      })
    );
  } catch {
    console.error('Problem fetching products');
  }

  return products;
};

export const fetchShippingRates = async () => {
  let shippingRates = [];

  getProducts: try {
    shippingRates = await stripe.shippingRates.list();
  } catch {
    console.error('Problem fetching shipping rates');
  }

  return shippingRates;
};
