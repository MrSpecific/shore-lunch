import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Page } from '@layout';
import PrintObject from '@commerce/PrintObject';
import Cart from '@commerce/Cart';
import ClearCart from '@commerce/ClearCart';

import { fetchGetJSON } from '@utils/apiHelpers';
import useSWR from 'swr';

const SuccessMessage = ({ data }) => {
  const { customer_details, shipping_details, line_items } = data;
  return (
    <div>
      <hr />
      <h3>
        Shipping to {shipping_details?.address?.city}, {shipping_details?.address?.state}
      </h3>
      <hr />
      <h2>Thank you for your order!</h2>
    </div>
  );
};

const ResultPage: NextPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout_sessions/${router.query.session_id}` : null,
    fetchGetJSON
  );

  if (error) return <div>There was a problem...</div>;

  return (
    <Page title="Checkout Result">
      <div className="page-container">
        <h1>Your Receipt.</h1>
        {/* <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2> */}
        {data?.payment_intent?.status === 'succeeded' && <SuccessMessage data={data} />}
        {/* <h3>CheckoutSession response:</h3> */}
        {/* <PrintObject content={data ?? 'loading...'} /> */}
        <Cart>
          <ClearCart />
        </Cart>
      </div>
    </Page>
  );
};

export default ResultPage;
