import { fetchShippingRates } from '@lib/stripe';

const getShippingRates = async () => {
  const stripeShippingRates = await fetchShippingRates();

  // console.log(stripeShippingRates);
  const shippingRates = stripeShippingRates;

  // shippingRates.push({
  //   shipping_rate_data: {
  //     type: 'fixed_amount',
  //     fixed_amount: { amount: 0, currency: 'usd' },
  //     display_name: 'Free shipping',
  //     delivery_estimate: {
  //       minimum: { unit: 'business_day', value: 5 },
  //       maximum: { unit: 'business_day', value: 7 },
  //     },
  //   },
  // });

  // shippingRates.push({
  //   shipping_rate_data: {
  //     type: 'fixed_amount',
  //     fixed_amount: { amount: 1000, currency: 'usd' },
  //     display_name: 'USPS',
  //     delivery_estimate: {
  //       minimum: { unit: 'business_day', value: 5 },
  //       maximum: { unit: 'business_day', value: 7 },
  //     },
  //   },
  // });

  return shippingRates;
};

export default getShippingRates;
