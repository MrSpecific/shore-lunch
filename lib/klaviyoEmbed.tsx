'use client';

import { useEffect, useRef } from 'react';
import { useAppContext } from '@lib/context/app';

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

export const KlaviyoEmbedOriginal = ({ formId }: { formId: string }) => {
  const originalRef = useRef<HTMLDivElement>(null);
  const className = `klaviyo-form-${formId}`;
  const { setKlaviyoEmbedRef } = useAppContext();

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
  const klaviyoTarget = useRef<HTMLDivElement>(null);
  const limit = useRef(0);

  useEffect(() => {
    let originalElement: HTMLElement | undefined;
    let newElement: HTMLElement | undefined;

    const moveForm = () => {
      if (klaviyoTarget?.current && klaviyoEmbedRef?.current?.childNodes.length) {
        originalElement = klaviyoEmbedRef.current;
        newElement = klaviyoTarget.current;

        if (klaviyoTarget?.current?.childNodes.length === 0) {
          klaviyoTarget.current.appendChild(klaviyoEmbedRef.current.firstChild as Node);
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
        originalElement.appendChild(newElement.firstChild as Node);
      }
    };
  }, [klaviyoTarget, klaviyoEmbedRef]);

  return <div ref={klaviyoTarget} />;
};
