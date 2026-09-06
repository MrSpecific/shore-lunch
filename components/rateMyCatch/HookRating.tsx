'use client';

import classNames from 'classnames';
import { FishHookIcon } from '@svg';
import styles from '@styles/components/HookRating.module.css';

const HOOK_VALUES = [1, 2, 3, 4, 5];

const HookRating = ({
  value,
  onSelect,
  readOnly = false,
  size = 'medium',
}: {
  value: number | null;
  onSelect?: (hooks: number) => void;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
}) => {
  const rounded = value ? Math.round(value) : 0;

  return (
    <div
      className={classNames(styles.hookRating, styles[size], { [styles.interactive]: !readOnly })}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={value ? `${value} out of 5 hooks` : 'Not yet rated'}
    >
      {HOOK_VALUES.map((hook) =>
        readOnly ? (
          <span key={hook} className={classNames(styles.hook, { [styles.filled]: hook <= rounded })}>
            <FishHookIcon />
          </span>
        ) : (
          <button
            key={hook}
            type="button"
            role="radio"
            aria-checked={hook === rounded}
            aria-label={`${hook} hook${hook > 1 ? 's' : ''}`}
            className={classNames(styles.hook, styles.hookButton, { [styles.filled]: hook <= rounded })}
            onClick={() => onSelect?.(hook)}
          >
            <FishHookIcon />
          </button>
        ),
      )}
    </div>
  );
};

export default HookRating;
