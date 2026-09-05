'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useShoppingCart } from 'use-shopping-cart';

import { gtagEvent } from '@lib/google';
import { useCheckout } from '@hooks';

interface CheckoutButtonInterface {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  includePrice?: boolean;
}

const CheckoutButton: React.FunctionComponent<CheckoutButtonInterface> = ({
  className,
  includePrice = false,
}) => {
  const { formattedTotalPrice, cartCount } = useShoppingCart();
  const { loading, handleCheckout } = useCheckout();
  const cartEmpty = !cartCount;

  return (
    <motion.button
      className={classNames('button', className)}
      type="button"
      onClick={(event) => {
        // gtagEvent('begin_checkout', {
        //   currency: 'USD',
        //   value: 100,
        // });
        handleCheckout(event);
      }}
      disabled={cartEmpty || loading}
      animate={loading ? { x: [0, 4, 0] } : {}}
      transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
    >
      {includePrice && !loading ? `${formattedTotalPrice} — ` : null}
      {!loading ? 'Checkout' : 'Loading...'}
    </motion.button>
  );
};

export default CheckoutButton;
