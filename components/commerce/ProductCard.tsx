import { stripHtml } from 'string-strip-html';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

import * as config from '@config';
import styles from '@styles/components/ProductCard.module.css';
import SanityImage from '@components/SanityImage';

const ProductCard = ({ product }) => {
  const { name, price, description, currency, images } = product;
  const { addItem, removeItem, handleCartHover } = useShoppingCart();

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
        <button
          className="button secondary"
          onClick={() => {
            addItem({
              ...product,
              currency: currency || config.CURRENCY,
              // product_data: {
              //   type: 'fruit',
              // },
            });
            handleCartHover();
          }}
        >
          Add <span className="visually-hidden">{name}</span> to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
