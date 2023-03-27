// import Stripe from 'stripe';

export const CURRENCY = 'usd';
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0;
export const MAX_AMOUNT = 5000.0;
export const AMOUNT_STEP = 5.0;

export const ALLOWED_COUNTRIES = ['US', 'CA'];
// export const ALLOWED_COUNTRIES: Stripe = ['US', 'CA'];
// export const API_VERSION = '2020-08-27';
export const API_VERSION = '2022-11-15';
