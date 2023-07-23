const isProductAvailable = ({ product, selectedVariant }) => {
  let available = true;

  // console.log(product);

  if (!product?.available) {
    available = false;
  }

  if (selectedVariant && selectedVariant.inventory <= 0) {
    available = false;
  }

  if (!selectedVariant && product.inventory <= 0) {
    available = false;
  }

  return available;
};

export default isProductAvailable;
