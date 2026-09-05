import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import { getPhotoWithStats, getCommentsForPhoto, getUserRatingForPhoto } from '@lib/rateMyCatch';
import RatingWidget from '@components/rateMyCatch/RatingWidget';
import CommentForm from '@components/rateMyCatch/CommentForm';
import CommentList from '@components/rateMyCatch/CommentList';
import styles from './CatchPhoto.module.css';

export const revalidate = 60;

function parsePhotoId(id: string): number | null {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const photoId = parsePhotoId(id);
  const photo = photoId ? await getPhotoWithStats(photoId) : null;
  return buildMetadata({
    path: `/rate-my-catch/${id}`,
    pageTitle: photo?.caption || `${photo?.authorName}'s catch` || 'Rate My Catch',
  });
}

export default async function CatchPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const photoId = parsePhotoId(id);
  if (!photoId) notFound();

  const { userId } = await auth();
  const [photo, comments, userRating] = await Promise.all([
    getPhotoWithStats(photoId),
    getCommentsForPhoto(photoId),
    userId ? getUserRatingForPhoto(photoId, userId) : null,
  ]);

  if (!photo) notFound();

  return (
    <Page>
      <section className="content content-y">
        <div className={styles.photoPage}>
          <div className={styles.imageWrapper}>
            <Image
              src={photo.imageUrl}
              alt={photo.caption || `Catch photo by ${photo.authorName}`}
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.details}>
            {photo.caption && <h1>{photo.caption}</h1>}
            <p className={styles.author}>Posted by {photo.authorName}</p>

            <RatingWidget
              photoId={photo.id}
              isSignedIn={Boolean(userId)}
              initialUserRating={userRating?.stars ?? null}
              averageRating={photo.averageRating}
              ratingCount={photo.ratingCount}
            />

            <section className={styles.comments}>
              <h2>Comments</h2>
              <CommentForm photoId={photo.id} isSignedIn={Boolean(userId)} />
              <CommentList comments={comments} />
            </section>
          </div>
        </div>
      </section>
    </Page>
  );
}
