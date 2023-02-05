import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@lib/context/app';

async function postData({ url, data = {} }) {
  if (!process.env.KLAVIYO_PRIVATE_KEY) return {};

  const response = await fetch(`${url}?api_key=${process.env.KLAVIYO_PRIVATE_KEY}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}

async function klaviyoHandler({ data }) {
  try {
    const { firstname, lastname, email, phonenumber, survey, interest } = data;

    const body = {
      profiles: [
        {
          first_name: firstname,
          last_name: lastname,
          interest: interest,
          email: email,
        },
      ],
    };

    const result = await postData({
      url: `https://a.klaviyo.com/api/v2/list/${process.env.KLAVIYO_NEWSLETTER_LIST_ID}/subscribe`,
      data: body,
    });

    return {
      status: 'success',
      data: await result.json(),
    }; // let client know outcome
  } catch (error) {
    // Failed to send data to Klaviyo
    return {
      status: 'error',
      error,
    };
  }
}

export const KlaviyoScriptTag = () => {
  if (!process?.env?.NEXT_PUBLIC_KLAVIYO_COMPANY_ID) return null;
  const unique_id = new Date().getTime();

  return (
    <script
      async
      type="text/javascript"
      src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID}`}
      id={`klaviyo-embed-${unique_id}`}
    />
  );
};

export const KlaviyoEmbedOriginal = ({ formId }) => {
  const originalRef = useRef();
  const [className, setClassName] = useState();
  const { setKlaviyoEmbedRef } = useAppContext();

  useEffect(() => {
    setClassName(`klaviyo-form-${formId}`);
  }, [formId]);

  useEffect(() => {
    setKlaviyoEmbedRef(originalRef);
  }, [originalRef, setKlaviyoEmbedRef]);

  return (
    <div ref={originalRef} style={{ display: 'none' }}>
      <div className={className} dangerouslySetInnerHTML={{ __html: '' }} />
    </div>
  );
};

export const KlaviyoEmbedForm = () => {
  const { klaviyoEmbedRef } = useAppContext();
  const klaviyoTarget = useRef(null);
  const limit = useRef(0);

  useEffect(() => {
    let originalElement;
    let newElement;

    const moveForm = () => {
      if (klaviyoTarget?.current && klaviyoEmbedRef?.current?.childNodes.length) {
        originalElement = klaviyoEmbedRef.current;
        newElement = klaviyoTarget.current;

        if (klaviyoTarget?.current?.childNodes.length === 0) {
          klaviyoTarget.current.appendChild(klaviyoEmbedRef.current.firstChild);
        }
      } else {
        if (limit.current < 10) {
          limit.current += 1;
          setTimeout(moveForm, 1000);
        }
      }
    };

    moveForm();

    return () => {
      if (originalElement && newElement) {
        originalElement.appendChild(newElement.firstChild);
      }
    };
  }, [klaviyoTarget, klaviyoEmbedRef]);

  return <div ref={klaviyoTarget} />;
};

export default klaviyoHandler;
