import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

import { Page } from '@layout';
import Cart from '@commerce/Cart';
import { useCheckout } from '@hooks';
import styles from '@styles/components/CartItems.module.css';

const CartLine = ({ id, image, name, quantity, formattedValue, formattedPrice }) => {
  const { decrementItem, incrementItem } = useShoppingCart();

  return (
    <li className={styles.cartLine}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} className="" />

      <div>
        <h3>{name}</h3>

        <div className="">
          <button
            type="button"
            onClick={() => {
              decrementItem(id, { count: 1 });
            }}
            aria-label={`Subtract one ${name} from your cart`}
          >
            -
          </button>
          {quantity}
          <button
            type="button"
            onClick={() => {
              incrementItem(id, { count: 1 });
            }}
            aria-label={`Add ${name} to your cart`}
          >
            +
          </button>
        </div>

        <span>{formattedPrice}</span>
      </div>
    </li>
  );
};

const CartItems = () => {
  const [cartEmpty, setCartEmpty] = useState(true);
  const { formattedTotalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart();
  const { loading, errorMessage, handleCheckout } = useCheckout();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  return (
    <section>
      <form onSubmit={handleCheckout} suppressHydrationWarning>
        {/* {JSON.stringify(cartDetails, null, 2)} */}
        <ul className={styles.cartLines}>
          {Object.values(cartDetails).map((item) => (
            <CartLine key={item.id} {...item} />
          ))}
        </ul>
        {errorMessage ? <p style={{ color: 'red' }}>Error: {errorMessage}</p> : null}
        {/* This is where we'll render our cart */}
        <p suppressHydrationWarning>
          <strong>Number of Items:</strong> {cartCount}
        </p>
        <p suppressHydrationWarning>
          <strong>Total:</strong> {formattedTotalPrice}
        </p>

        <button className="button" type="submit" disabled={cartEmpty || loading}>
          Checkout
        </button>
        <button className="text-button" type="button" onClick={clearCart}>
          Clear Cart
        </button>
      </form>
    </section>
  );
};

export default CartItems;
