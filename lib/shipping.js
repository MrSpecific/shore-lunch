import { fetchShippingRates } from '@lib/stripe';

const getShippingRates = async ({ cart }) => {
  const stripeShippingRates = await fetchShippingRates();

  const pickupRate = stripeShippingRates.find(
    ({ shipping_rate_data }) => shipping_rate_data.display_name === 'Local Pickup'
  );

  const shippingRates = stripeShippingRates.filter(
    ({ shipping_rate_data }) => shipping_rate_data.fixed_amount?.amount > 0
  );

  if (pickupRate) {
    shippingRates.push(pickupRate);
  }

  return shippingRates;
};

export default getShippingRates;
