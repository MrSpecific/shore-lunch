import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import { listPhotosPage } from '@lib/rateMyCatch';
import CatchSubNav from '@components/rateMyCatch/CatchSubNav';
import InfiniteCatchList from '@components/rateMyCatch/InfiniteCatchList';
import styles from './RateMyCatch.module.css';

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  path: '/rate-my-catch',
  pageTitle: 'Rate My Catch',
});

export default async function RateMyCatchPage() {
  const [{ userId }, { photos, nextCursor }] = await Promise.all([auth(), listPhotosPage()]);

  return (
    <Page>
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <CatchSubNav active="all" />
          <div className={styles.header}>
            <div>
              <h1>Rate My Catch</h1>
              <p className={styles.subhead}>
                Show off the one that didn&apos;t get away - or the shore lunch you made with it.
                Post a fish pic or a food pic and let the community rate it.
              </p>
            </div>
            <Link
              href={
                userId ? '/rate-my-catch/upload' : '/sign-in?redirect_url=/rate-my-catch/upload'
              }
              className="button"
            >
              Post your catch
            </Link>
          </div>
          <InfiniteCatchList initialPhotos={photos} initialCursor={nextCursor} />
        </div>
      </section>
    </Page>
  );
}
