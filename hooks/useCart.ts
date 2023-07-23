import * as config from '@config';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { urlForImage } from '@lib/sanity';

const useCart = ({ product, selectedVariant }) => {
  const { addItem, removeItem, handleCartHover } = useShoppingCart();
  const { name, price, description, currency, images, hasVariants } = product;

  const addToCart = ({ quantity = 1 } = { quantity: 1 }) => {
    addItem({
      ...product,
      id: selectedVariant ? `${product.id}-${selectedVariant.sku}` : product.id,
      name: selectedVariant ? `${product.name} - ${selectedVariant.title}` : product.name,
      currency: currency || config.CURRENCY,
      quantity,
      image: images[0] && urlForImage(images[0]).width(600).url(),
    });
    handleCartHover();
  };

  const removeFromCart = (product) => {};

  return { addToCart, removeFromCart, formatCurrencyString };
};

export default useCart;
