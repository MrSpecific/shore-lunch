'use client';

import classNames from 'classnames';
import styles from '@styles/components/StarRating.module.css';

const STAR_VALUES = [1, 2, 3, 4, 5];

const StarRating = ({
  value,
  onSelect,
  readOnly = false,
  size = 'medium',
}: {
  value: number | null;
  onSelect?: (stars: number) => void;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
}) => {
  const rounded = value ? Math.round(value) : 0;

  return (
    <div
      className={classNames(styles.starRating, styles[size], { [styles.interactive]: !readOnly })}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={value ? `${value} out of 5 stars` : 'Not yet rated'}
    >
      {STAR_VALUES.map((star) =>
        readOnly ? (
          <span key={star} className={classNames(styles.star, { [styles.filled]: star <= rounded })}>
            ★
          </span>
        ) : (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === rounded}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            className={classNames(styles.star, styles.starButton, { [styles.filled]: star <= rounded })}
            onClick={() => onSelect?.(star)}
          >
            ★
          </button>
        ),
      )}
    </div>
  );
};

export default StarRating;
