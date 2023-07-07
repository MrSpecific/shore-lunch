import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import classNames from 'classnames';

import { Page } from '@layout';
import Cart from '@commerce/Cart';
import SanityImage from '@components/SanityImage';
import { useCheckout } from '@hooks';
import styles from '@styles/components/CartItems.module.css';

const QuantityControls = ({ id, quantity }) => {
  const { decrementItem, incrementItem, removeItem } = useShoppingCart();

  return (
    <div className={styles.quantityControlWrapper}>
      <div className={styles.quantityControls}>
        <button
          type="button"
          onClick={() => {
            decrementItem(id, { count: 1 });
          }}
          aria-label={`Subtract one ${name} from your cart`}
          className={styles.decrement}
        >
          -
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button
          type="button"
          onClick={() => {
            incrementItem(id, { count: 1 });
          }}
          aria-label={`Add ${name} to your cart`}
          className={styles.increment}
        >
          +
        </button>
      </div>
      <button
        className={classNames('button-link', [styles.removeLine])}
        onClick={() => removeItem(id)}
      >
        Remove
      </button>
    </div>
  );
};

const CartLine = (props) => {
  const { id, images, name, quantity, formattedValue, formattedPrice, currency } = props;

  return (
    <li className={styles.cartLine}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* <img src={image} className={styles.lineImage} alt="" /> */}
      <SanityImage {...images[0]} className={styles.lineImage} width={300} height={300} />

      <div className={styles.lineContent}>
        <div>
          <h3 className={styles.lineHeadline}>{name}</h3>
        </div>

        <QuantityControls id={id} quantity={quantity} />
      </div>

      <div className={styles.lineSummary}>
        <span className={styles.lineTotal}>{formattedValue}</span>
        <span className={styles.itemPrice}>{formattedPrice} each</span>
      </div>
    </li>
  );
};

const CartItems = () => {
  const [cartEmpty, setCartEmpty] = useState(true);
  const { formattedTotalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart();
  const { loading, handleCheckout } = useCheckout();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  if (cartEmpty) {
    return (
      <div className={styles.emptyCart}>
        <h3 className="h6">Your cart is empty</h3>
      </div>
    );
  }

  return (
    <section>
      <ul className={styles.cartLines}>
        {Object.values(cartDetails).map((item) => (
          <CartLine key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
};

export default CartItems;
