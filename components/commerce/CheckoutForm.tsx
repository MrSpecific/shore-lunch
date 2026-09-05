'use client';

import React, { useState } from 'react';

import CustomDonationInput from '@commerce/CustomDonationInput';
import StripeTestCards from '@commerce/StripeTestCards';

import { formatAmountForDisplay } from '@lib/stripe';
import { fetchPostJSON } from '@utils/apiHelpers';
import * as config from '@config';

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: input.customDonation,
    });

    if (response.statusCode === 500 || !response.url) {
      console.error(response.message);
      setLoading(false);
      return;
    }

    // Redirect to the Checkout Session's own hosted page -- Stripe.js's
    // redirectToCheckout() is removed as of API version 2025-09-30.clover.
    window.location.href = response.url;
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomDonationInput
        className="checkout-style"
        name={'customDonation'}
        value={input.customDonation}
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        step={config.AMOUNT_STEP}
        currency={config.CURRENCY}
        onChange={handleInputChange}
      />
      <StripeTestCards />
      <button className="checkout-style-background" type="submit" disabled={loading}>
        Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
      </button>
    </form>
  );
};

export default CheckoutForm;
