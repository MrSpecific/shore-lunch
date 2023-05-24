import Image from 'next/image';
import Link from 'next/link';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { stripHtml } from 'string-strip-html';

import * as config from '@config';
import styles from '@styles/components/ProductCard.module.css';

const { log } = console;

const ProductCard = ({ product }) => {
  const { name, image, price, description, currency, assets } = product;
  const { addItem, removeItem, handleCartHover } = useShoppingCart();
  console.log(product);

  const addToCart = () => {
    log('test');
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.cardTop}>
        <Image src={image.url} alt={name} className={styles.cardImage} width={300} height={300} />
        <h2>
          <Link href={`/product/${product.permalink}`}>{name}</Link>
        </h2>
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.price}>{price.formatted_with_symbol}</div>
        <div className={styles.cardDescription}>{stripHtml(description).result}</div>
      </div>
      <div className={styles.cardActions}>
        <button className="button secondary" onClick={addToCart}>
          Add <span className="visually-hidden">{name}</span> to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
