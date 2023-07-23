import * as config from '@config';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { urlForImage } from '@lib/sanity';

const useCart = ({ product, selectedVariant }) => {
  const { addItem, removeItem, handleCartHover } = useShoppingCart();
  const { id, name, price, description, currency, images, hasVariants } = product;
  const selectedId = hasVariants && selectedVariant ? `${id}-${selectedVariant.sku}` : id;

  const addToCart = ({ quantity = 1 } = { quantity: 1 }) => {
    addItem({
      ...product,
      id: selectedId,
      name: selectedVariant ? `${product.name} - ${selectedVariant.title}` : product.name,
      currency: currency || config.CURRENCY,
      quantity,
      image: images[0] && urlForImage(images[0]).width(600).url(),
      product_data: {
        metadata: {
          parentId: id,
          sku: selectedVariant?.sku,
          tester: 'product_data',
        },
      },
      product_metadata: {
        parentId: id,
        sku: selectedVariant?.sku,
        tester: 'product_metadata',
      },
    });
    handleCartHover();
  };

  const removeFromCart = (product) => {};

  return { addToCart, removeFromCart, formatCurrencyString };
};

export default useCart;
