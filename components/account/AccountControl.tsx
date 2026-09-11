'use client';

import Link from 'next/link';
import { Show, UserButton } from '@clerk/nextjs';
import { AccountIcon } from '@svg';
import styles from '@styles/components/AccountControl.module.css';

export const AccountControl = () => {
  return (
    <div className={styles.accountControl}>
      <Show when="signed-in">
        <UserButton userProfileMode="navigation" userProfileUrl="/account" />
      </Show>
      <Show when="signed-out">
        <Link href="/sign-in" className={styles.signInLink}>
          <AccountIcon style={{ height: '28px', width: '28px' }} />
          <span className="visually-hidden">Sign in</span>
        </Link>
      </Show>
    </div>
  );
};

export default AccountControl;
