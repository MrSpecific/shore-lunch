import Image from 'next/image';
import swell, { fetchProducts } from '@lib/swell';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

import * as config from '@config';
import styles from '@styles/components/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { name, price, description, currency } = product;
  const { addItem, removeItem, handleCartHover } = useShoppingCart();

  // console.log(await swell.currency.format(price));

  return (
    <div className={styles.productCard}>
      <div className={styles.cardTop}>
        <Image
          src={product.images[0] && product.images[0].file.url}
          alt={name}
          className={styles.cardImage}
          width={300}
          height={300}
        />
        <h2>{name}</h2>
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.price}>
          {/* {formatCurrencyString({
            value: price,
            currency: currency || config.CURRENCY,
          })} */}
          {JSON.stringify(price)}
          {swell.currency.format(price)}
        </div>
        <div className={styles.cardDescription}>{description}</div>
      </div>
      <div className={styles.cardActions}>
        <button
          className="button secondary"
          onClick={() => {
            addItem({
              ...product,
              product_data: {
                type: 'fruit',
              },
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
