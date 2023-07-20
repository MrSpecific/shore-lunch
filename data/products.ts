import { fetchSanityContent } from '@lib/sanity';
import * as config from '@config';
// import { fetchProducts } from '@lib/stripe';

const testProducts = [
  {
    name: 'Bananas',
    description: 'Yummy yellow fruit',
    id: 'sku_GBJ2Ep8246qeeT',
    price: 400,
    image:
      'https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
    attribution: 'Photo by Priscilla Du Preez on Unsplash',
    currency: 'USD',
  },
  {
    name: 'Tangerines',
    id: 'sku_GBJ2WWfMaGNC2Z',
    price: 100,
    image:
      'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
    attribution: 'Photo by Jonathan Pielmayer on Unsplash',
    currency: 'USD',
  },
  {
    name: 'Tester',
    id: 'sku_tester',
    price: 500,
    image:
      'https://images.unsplash.com/photo-1618914730126-9d4fe79d24e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    attribution: 'Photo by Jonathan Pielmayer on Unsplash',
    currency: 'USD',
  },
];

export const availableProducts = async () => {
  // const stripeProducts = await fetchProducts();

  const products = await fetchSanityContent('availableProductsQuery');

  const transformedProducts = products.map((product) => {
    return { ...product, currency: config.CURRENCY };
  });

  return transformedProducts;
};

export const availableProductsWithSKU = async () => {
  const products = await availableProducts();

  // console.log('products', products);

  const productSkus = products.reduce((skus, product) => {
    if (product.hasVariants) {
      const skuProuducts = product.variants.map((variant) => {
        const skuId = `${product.id}-${variant.sku}`;
        const skuName = `${product.title} - ${variant.title}`;

        return { ...product, id: skuId, _id: skuId, name: skuName, inventory: variant.inventory };
      });

      // console.log('--------');
      // console.log('skuProuducts', skuProuducts);

      skus = [...skus, ...skuProuducts];
    }

    return skus;
  }, []);

  // console.log('-----------');
  // console.log('productSkus', productSkus);
  // console.log('-----------');

  return [...products, ...productSkus];
};

const products = testProducts;

export default products;
