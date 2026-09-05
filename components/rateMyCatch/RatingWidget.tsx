'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import StarRating from './StarRating';
import { rateCatchPhoto } from '@/app/rate-my-catch/actions';
import styles from '@styles/components/RatingWidget.module.css';

const RatingWidget = ({
  photoId,
  isSignedIn,
  initialUserRating,
  averageRating,
  ratingCount,
}: {
  photoId: number;
  isSignedIn: boolean;
  initialUserRating: number | null;
  averageRating: number | null;
  ratingCount: number;
}) => {
  const [userRating, setUserRating] = useState(initialUserRating);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isSignedIn) {
    return (
      <p className={styles.signInPrompt}>
        <Link href={`/sign-in?redirect_url=/rate-my-catch/${photoId}`}>Sign in</Link> to rate this catch.
      </p>
    );
  }

  const handleSelect = (stars: number) => {
    setError(null);
    const previous = userRating;
    setUserRating(stars);
    startTransition(async () => {
      try {
        await rateCatchPhoto(photoId, stars);
      } catch (err) {
        setUserRating(previous);
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      }
    });
  };

  return (
    <div className={styles.ratingWidget}>
      <StarRating value={userRating} onSelect={handleSelect} size="large" />
      {isPending && <span className={styles.saving}>Saving…</span>}
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.summary}>
        {averageRating !== null
          ? `${averageRating.toFixed(1)} average (${ratingCount} rating${ratingCount === 1 ? '' : 's'})`
          : 'No ratings yet'}
      </p>
    </div>
  );
};

export default RatingWidget;
