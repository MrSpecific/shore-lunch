import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import { listPhotosWithStats } from '@lib/rateMyCatch';
import PhotoCard from '@components/rateMyCatch/PhotoCard';
import styles from './RateMyCatch.module.css';

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({ path: '/rate-my-catch', pageTitle: 'Rate My Catch' });

export default async function RateMyCatchPage() {
  const [{ userId }, photos] = await Promise.all([auth(), listPhotosWithStats()]);

  return (
    <Page>
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <div className={styles.header}>
            <div>
              <h1>Rate My Catch</h1>
              <p className={styles.subhead}>
                Show off the one that didn&apos;t get away — or the shore lunch you made with it. Post a
                fish pic or a food pic and let the crew rate it.
              </p>
            </div>
            <Link
              href={userId ? '/rate-my-catch/upload' : '/sign-in?redirect_url=/rate-my-catch/upload'}
              className="button"
            >
              Post your catch
            </Link>
          </div>
          {photos.length === 0 ? (
            <p>No catches posted yet — be the first to share one.</p>
          ) : (
            <div className={styles.photoGrid}>
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Page>
  );
}
