import { eq, desc, and, inArray, sql } from 'drizzle-orm';
import { getDb } from '@lib/db';
import { fishPhotos, fishRatings, fishComments } from '@lib/db/schema';
import { getAuthorsByClerkId, resolveAuthor } from './authors';

export type PhotoWithStats = {
  id: number;
  clerkUserId: string;
  authorName: string;
  authorAvatarUrl: string | null;
  imageUrl: string;
  caption: string | null;
  archived: boolean;
  createdAt: Date;
  averageRating: number | null;
  ratingCount: number;
  commentCount: number;
};

export type CommentWithAuthor = {
  id: number;
  photoId: number;
  clerkUserId: string;
  authorName: string;
  authorAvatarUrl: string | null;
  body: string;
  createdAt: Date;
};

async function attachStats(photos: (typeof fishPhotos.$inferSelect)[]): Promise<PhotoWithStats[]> {
  if (photos.length === 0) return [];
  const db = getDb();
  const photoIds = photos.map((photo) => photo.id);

  const [ratingRows, commentRows, authorMap] = await Promise.all([
    db
      .select({
        photoId: fishRatings.photoId,
        averageRating: sql<string>`avg(${fishRatings.stars})`,
        ratingCount: sql<string>`count(*)`,
      })
      .from(fishRatings)
      .where(inArray(fishRatings.photoId, photoIds))
      .groupBy(fishRatings.photoId),
    db
      .select({
        photoId: fishComments.photoId,
        commentCount: sql<string>`count(*)`,
      })
      .from(fishComments)
      .where(inArray(fishComments.photoId, photoIds))
      .groupBy(fishComments.photoId),
    getAuthorsByClerkId(photos.map((photo) => photo.clerkUserId)),
  ]);

  const ratingsByPhoto = new Map(ratingRows.map((row) => [row.photoId, row]));
  const commentsByPhoto = new Map(commentRows.map((row) => [row.photoId, row]));

  return photos.map((photo) => {
    const ratingRow = ratingsByPhoto.get(photo.id);
    const commentRow = commentsByPhoto.get(photo.id);
    const author = resolveAuthor(authorMap, photo.clerkUserId);
    return {
      ...photo,
      authorName: author.name,
      authorAvatarUrl: author.avatarUrl,
      averageRating: ratingRow ? Number(ratingRow.averageRating) : null,
      ratingCount: ratingRow ? Number(ratingRow.ratingCount) : 0,
      commentCount: commentRow ? Number(commentRow.commentCount) : 0,
    };
  });
}

export async function listPhotosWithStats(): Promise<PhotoWithStats[]> {
  const db = getDb();
  const photos = await db
    .select()
    .from(fishPhotos)
    .where(eq(fishPhotos.archived, false))
    .orderBy(desc(fishPhotos.createdAt));
  return attachStats(photos);
}

export async function getPhotoWithStats(photoId: number): Promise<PhotoWithStats | null> {
  const db = getDb();
  const [photo] = await db
    .select()
    .from(fishPhotos)
    .where(and(eq(fishPhotos.id, photoId), eq(fishPhotos.archived, false)))
    .limit(1);
  if (!photo) return null;
  const [withStats] = await attachStats([photo]);
  return withStats;
}

// Admin-only: includes archived photos, for the Sanity Studio moderation tool.
export async function listAllPhotosForAdmin(): Promise<PhotoWithStats[]> {
  const db = getDb();
  const photos = await db.select().from(fishPhotos).orderBy(desc(fishPhotos.createdAt));
  return attachStats(photos);
}

export async function setPhotoArchived(photoId: number, archived: boolean) {
  const db = getDb();
  const [photo] = await db
    .update(fishPhotos)
    .set({ archived })
    .where(eq(fishPhotos.id, photoId))
    .returning();
  return photo ?? null;
}

export async function deletePhoto(photoId: number) {
  const db = getDb();
  const [photo] = await db.delete(fishPhotos).where(eq(fishPhotos.id, photoId)).returning();
  return photo ?? null;
}

export async function getCommentsForPhoto(photoId: number): Promise<CommentWithAuthor[]> {
  const db = getDb();
  const comments = await db
    .select()
    .from(fishComments)
    .where(eq(fishComments.photoId, photoId))
    .orderBy(desc(fishComments.createdAt));

  const authorMap = await getAuthorsByClerkId(comments.map((comment) => comment.clerkUserId));

  return comments.map((comment) => {
    const author = resolveAuthor(authorMap, comment.clerkUserId);
    return { ...comment, authorName: author.name, authorAvatarUrl: author.avatarUrl };
  });
}

export async function getUserRatingForPhoto(photoId: number, clerkUserId: string) {
  const db = getDb();
  const [rating] = await db
    .select()
    .from(fishRatings)
    .where(and(eq(fishRatings.photoId, photoId), eq(fishRatings.clerkUserId, clerkUserId)))
    .limit(1);
  return rating ?? null;
}

export async function createPhoto(input: {
  clerkUserId: string;
  imageUrl: string;
  caption: string | null;
}) {
  const db = getDb();
  const [photo] = await db.insert(fishPhotos).values(input).returning();
  return photo;
}

export async function upsertRating(input: { photoId: number; clerkUserId: string; stars: number }) {
  const db = getDb();
  const [rating] = await db
    .insert(fishRatings)
    .values(input)
    .onConflictDoUpdate({
      target: [fishRatings.photoId, fishRatings.clerkUserId],
      set: { stars: input.stars },
    })
    .returning();
  return rating;
}

export async function createComment(input: {
  photoId: number;
  clerkUserId: string;
  body: string;
}) {
  const db = getDb();
  const [comment] = await db.insert(fishComments).values(input).returning();
  return comment;
}
