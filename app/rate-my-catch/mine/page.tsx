import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import { listPhotosPage } from '@lib/rateMyCatch';
import CatchSubNav from '@components/rateMyCatch/CatchSubNav';
import InfiniteCatchList from '@components/rateMyCatch/InfiniteCatchList';
import styles from '../RateMyCatch.module.css';

export const metadata: Metadata = buildMetadata({
  path: '/rate-my-catch/mine',
  pageTitle: 'My Catches',
  tags: { noIndex: true },
});

export default async function MyCatchesPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in?redirect_url=/rate-my-catch/mine');

  const { photos, nextCursor } = await listPhotosPage({ clerkUserId: userId });

  return (
    <Page>
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <CatchSubNav active="mine" />
          <div className={styles.header}>
            <div>
              <h1>My Catches</h1>
              <p className={styles.subhead}>Everything you&apos;ve posted to Rate My Catch.</p>
            </div>
          </div>
          <InfiniteCatchList
            initialPhotos={photos}
            initialCursor={nextCursor}
            mine
            emptyMessage="You haven't posted a catch yet."
          />
        </div>
      </section>
    </Page>
  );
}
