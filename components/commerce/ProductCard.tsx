import products from '@data/products';
import { formatCurrencyString } from 'use-shopping-cart';
import { useShoppingCart } from 'use-shopping-cart';
import styles from '@styles/components/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { name, price, currency } = product;
  const { addItem, removeItem, handleCartHover } = useShoppingCart();

  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={name} className={styles.cardImage} />
      <h2>{name}</h2>
      <p className="price">
        {formatCurrencyString({
          value: price,
          currency: currency,
        })}
      </p>
      <button
        className="cart-style-background"
        onClick={() => {
          addItem(product);
          handleCartHover();
        }}
      >
        Add to cart
      </button>
      <button className="cart-style-background" onClick={() => removeItem(product.id)}>
        Remove
      </button>
    </div>
  );
};

export default ProductCard;
