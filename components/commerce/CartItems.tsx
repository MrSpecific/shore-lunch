import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

import { Page } from '@layout';
import Cart from '@commerce/Cart';
import { useCheckout } from '@hooks';
import styles from '@styles/components/CartItems.module.css';

const CartLine = (props) => {
  const { id, image, name, quantity, formattedValue, formattedPrice } = props;
  const { decrementItem, incrementItem } = useShoppingCart();

  return (
    <li className={styles.cartLine}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} className="" alt="" />

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
  const { loading, handleCheckout } = useCheckout();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  return (
    <section>
      {/* {JSON.stringify(cartDetails, null, 2)} */}
      <ul className={styles.cartLines}>
        {Object.values(cartDetails).map((item) => (
          <CartLine key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
};

export default CartItems;
