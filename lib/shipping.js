import { fetchShippingRates } from '@lib/stripe';

const getShippingRates = async ({ cart }) => {
  const stripeShippingRates = await fetchShippingRates();

  const pickupRate = stripeShippingRates.find(
    ({ shipping_rate_data }) => shipping_rate_data.display_name === 'Local Pickup'
  );

  const shippingRates = stripeShippingRates.filter(
    ({ shipping_rate_data }) => shipping_rate_data.fixed_amount?.amount > 0
  );

  // console.log('shippingRates', shippingRates);

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

  if (pickupRate) {
    shippingRates.push(pickupRate);
  }

  return shippingRates;
};

export default getShippingRates;
