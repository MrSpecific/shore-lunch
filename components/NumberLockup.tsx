import classNames from 'classnames';
import styles from '@styles/components/NumberLockup.module.css';

export default function NumberLockup({ episodeNumber, className, style }) {
  if (!episodeNumber) return null;

  return (
    <div className={classNames([styles.numberLockup, className])} style={style}>
      <span className={styles.superScript}>No.</span>
      {episodeNumber}
    </div>
  );
}
