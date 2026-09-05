'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

import * as config from '@config';
import { fetchGetJSON } from '@utils/apiHelpers';
import styles from '@styles/page/Result.module.css';

const SuccessMessage = ({ data }: { data: any }) => {
  const { cartCount, clearCart } = useShoppingCart();
  const { amount_total, currency, collected_information } = data;
  // Checkout Session's shipping_details moved to
  // collected_information.shipping_details as of API version 2025-03-31.basil.
  const shipping_details = collected_information?.shipping_details;

  useEffect(() => {
    if ((cartCount ?? 0) > 0) {
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.receiptBody}>
        Order total:&nbsp;
        {formatCurrencyString({
          value: amount_total,
          currency: currency || config.CURRENCY,
        })}
        <br />
        Shipping to {shipping_details?.address?.city}, {shipping_details?.address?.state}
      </div>
      <h2>Thank you for your order!</h2>
    </div>
  );
};

export default function ResultContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');

  const { data, error } = useSWR(
    sessionId ? `/api/checkout_sessions/${sessionId}` : null,
    fetchGetJSON
  );

  if (error) return <div>There was a problem...</div>;

  return (
    <section className="page-container">
      <div className={styles.receiptContainer}>
        <h1>Your Receipt.</h1>
        {data?.payment_intent?.status === 'succeeded' && <SuccessMessage data={data} />}
      </div>
    </section>
  );
}
