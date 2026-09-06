import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import UploadForm from '@components/rateMyCatch/UploadForm';
import styles from '../RateMyCatch.module.css';

export const metadata: Metadata = buildMetadata({
  path: '/rate-my-catch/upload',
  pageTitle: 'Post Your Catch',
});

export default async function UploadCatchPhotoPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in?redirect_url=/rate-my-catch/upload');

  return (
    <Page>
      <section className="content content-y">
        <div className={styles.uploadPage}>
          <h1>Post your catch</h1>
          <p className={styles.subhead}>Got a fish pic or a food pic? Share it with the crew.</p>
          <UploadForm />
        </div>
      </section>
    </Page>
  );
}
