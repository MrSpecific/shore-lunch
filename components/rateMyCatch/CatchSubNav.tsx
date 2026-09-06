import Link from 'next/link';
import classNames from 'classnames';
import styles from '@styles/components/CatchSubNav.module.css';

const CatchSubNav = ({ active }: { active: 'all' | 'mine' }) => {
  return (
    <nav className={styles.subNav} aria-label="Rate My Catch sections">
      <Link
        href="/rate-my-catch"
        className={classNames(styles.link, { [styles.active]: active === 'all' })}
        aria-current={active === 'all' ? 'page' : undefined}
      >
        All Catches
      </Link>
      <Link
        href="/rate-my-catch/mine"
        className={classNames(styles.link, { [styles.active]: active === 'mine' })}
        aria-current={active === 'mine' ? 'page' : undefined}
      >
        My Catches
      </Link>
    </nav>
  );
};

export default CatchSubNav;
