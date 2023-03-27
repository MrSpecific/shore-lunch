import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import * as config from '@config';
import styles from '@styles/components/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { name, price, description, currency } = product;
  const { addItem, removeItem, handleCartHover } = useShoppingCart();

  return (
    <div className={styles.productCard}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className={styles.cardTop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={name} className={styles.cardImage} />
        <h2>{name}</h2>
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.price}>
          {formatCurrencyString({
            value: price,
            currency: currency || config.CURRENCY,
          })}
        </div>
        <div className={styles.cardDescription}>{description}</div>
      </div>
      <div className={styles.cardActions}>
        <button
          className="button"
          onClick={() => {
            addItem(product);
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
