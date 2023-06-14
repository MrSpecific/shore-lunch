import swell from 'swell-js';

const { log } = console;

// Initialize the client first
swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY, {
  useCamelCase: true,
  withCredentials: true,
});

export const fetchProducts = async ({ options = {} } = {}) => {
  await swell;

  return await swell.products.list({
    // category: 't-shirts',
    // limit: 25,
    // page: 1,
  });
};

export default swell;

export const getPrice = (price: string | number | undefined, currency: string) =>
  Intl.NumberFormat(undefined, {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price + '' : '0'));
