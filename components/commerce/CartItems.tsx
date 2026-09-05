'use client';

import { useShoppingCart } from 'use-shopping-cart';
import classNames from 'classnames';

import SanityImage from '@components/SanityImage';
import { useHasMounted } from '@hooks';
import css from './CartItems.module.css';

const QuantityControls = ({ id, quantity }) => {
  const { decrementItem, incrementItem, removeItem } = useShoppingCart();

  return (
    <div className={css.quantityControlWrapper}>
      <div className={css.quantityControls}>
        <button
          type="button"
          onClick={() => {
            decrementItem(id, { count: 1 });
          }}
          aria-label={`Subtract one ${name} from your cart`}
          className={css.decrement}
        >
          -
        </button>
        <span className={css.quantity}>{quantity}</span>
        <button
          type="button"
          onClick={() => {
            incrementItem(id, { count: 1 });
          }}
          aria-label={`Add ${name} to your cart`}
          className={css.increment}
        >
          +
        </button>
      </div>
      <button
        className={classNames('button-link', [css.removeLine])}
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
    <li className={css.cartLine}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* <img src={image} className={css.lineImage} alt="" /> */}
      <div className={css.imageWrapper}>
        <SanityImage {...images[0]} className={css.lineImage} width={300} height={300} />
      </div>

      <div className={css.lineContent}>
        <div>
          <h3 className={css.lineHeadline}>{name}</h3>
        </div>

        <QuantityControls id={id} quantity={quantity} />
      </div>

      <div className={css.lineSummary}>
        <span className={css.lineTotal}>{formattedValue}</span>
        <span className={css.itemPrice}>{formattedPrice} each</span>
      </div>
    </li>
  );
};

const CartItems = () => {
  const { cartCount, cartDetails } = useShoppingCart();
  // cartCount reflects use-shopping-cart's localStorage-persisted cart, which
  // isn't known until after the client mounts -- until then, render the same
  // "empty" state the server sees, to avoid swapping this entire subtree
  // (empty message vs. the real item list) during hydration.
  const hasMounted = useHasMounted();
  const cartEmpty = !hasMounted || !cartCount;

  if (cartEmpty) {
    return (
      <div className={css.emptyCart}>
        <h3 className="h6">Your cart is empty</h3>
      </div>
    );
  }

  return (
    <section>
      <ul className={css.cartLines}>
        {Object.values(cartDetails ?? {}).map((item) => (
          <CartLine key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
};

export default CartItems;
