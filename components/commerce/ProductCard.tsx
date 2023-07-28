import { useState, useEffect } from 'react';
import { stripHtml } from 'string-strip-html';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

import * as config from '@config';
import styles from '@styles/components/ProductCard.module.css';
import SanityImage from '@components/SanityImage';
import { isProductAvailable } from '@lib/commerce';
import { useCart } from '@hooks';
import classNames from 'classnames';

const VariantSelector = ({ variants, selectedVariant, setSelectedVariant }) => {
  const handleChange = (e) => {
    const sku = e.target.value;
    const variant = variants.find((v) => v.sku === sku);
    setSelectedVariant(variant);
  };

  return (
    <select
      onChange={handleChange}
      defaultValue={selectedVariant.sku}
      className={styles.variantSelect}
    >
      {variants.map((variant, i) => (
        <option key={i} value={variant.sku}>
          {variant.title}
        </option>
      ))}
    </select>
  );
};

const ProductCard = ({ product }) => {
  const { name, price, description, currency, images, hasVariants } = product;
  const { addItem, removeItem, handleCartHover } = useShoppingCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants && product.variants[0]);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const isAvailable = isProductAvailable({ product, selectedVariant });
    setAvailable(isAvailable);
  }, [product, selectedVariant]);

  const { addToCart } = useCart({ product, selectedVariant });

  return (
    <div className={styles.productCard}>
      <div className={styles.cardTop}>
        <SanityImage {...images[0]} className={styles.cardImage} width={300} height={300} />
        <h2>{name}</h2>
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.price}>
          {formatCurrencyString({
            value: price,
            currency: currency || config.CURRENCY,
          })}
        </div>
        {description && (
          <div className={styles.cardDescription}>{stripHtml(description).result}</div>
        )}
      </div>
      <div className={styles.cardActions}>
        {hasVariants && (
          <VariantSelector
            {...product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        )}
        <button
          className={classNames(styles.addToCart, 'button secondary')}
          onClick={() => {
            addToCart();
          }}
          disabled={!available}
        >
          {available ? (
            <>
              Add <span className="visually-hidden">{name}</span> to cart
            </>
          ) : (
            'Sold Out'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
