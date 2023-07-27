import React, { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON } from '@utils/apiHelpers';

const useCheckout = (callBack = () => {}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { cartDetails, redirectToCheckout } = useShoppingCart();

  // const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (event) => {
  const handleCheckout: any = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const response = await fetchPostJSON('/api/checkout_sessions/cart', cartDetails);

    console.log('CART response', response);

    if (response.statusCode > 399) {
      setErrorMessage(response.message);
      setLoading(false);
      return;
    }

    redirectToCheckout(response.id);
  };

  return { loading, errorMessage, handleCheckout };
};

export default useCheckout;
