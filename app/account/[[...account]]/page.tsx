import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { UserProfile } from '@clerk/nextjs';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import styles from '../AccountPage.module.css';

export const metadata: Metadata = buildMetadata({
  path: '/account',
  pageTitle: 'Account',
  tags: { noIndex: true },
});

export default async function AccountPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in?redirect_url=/account');

  return (
    <Page>
      <div className={styles.accountPage}>
        <UserProfile path="/account" routing="path" />
      </div>
    </Page>
  );
}
