import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { useCartDispatch, useCartState, useCartMeta } from '@context/cart';
import { gtagEvent } from '@lib/google';
import { useCheckout } from '@hooks';

const { log } = console;

interface CheckoutButtonInterface {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
}

const CheckoutButton: React.FunctionComponent<CheckoutButtonInterface> = ({ className }) => {
  const { loading, total_items, ...state } = useCartState();
  const { handleCheckout } = useCartDispatch();

  // log(state);

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
      disabled={total_items <= 0 || loading}
      animate={loading ? { x: [0, 4, 0] } : {}}
      transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
    >
      {!loading ? 'Checkout' : 'Loading...'}
    </motion.button>
  );
};

export default CheckoutButton;
