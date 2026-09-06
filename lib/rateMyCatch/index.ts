import { eq, desc, and, or, lt, inArray, sql } from 'drizzle-orm';
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
  // ISO string, not a Date — this shape is also returned as JSON from the
  // infinite-scroll API route, so it stays consistent whether it came from
  // a server-rendered first page or a client-fetched later one.
  createdAt: string;
  averageRating: number | null;
  ratingCount: number;
  commentCount: number;
};

export type PhotoPage = {
  photos: PhotoWithStats[];
  nextCursor: string | null;
};

const DEFAULT_PAGE_SIZE = 12;

function encodeCursor(row: { createdAt: Date; id: number }): string {
  return Buffer.from(`${row.createdAt.toISOString()}|${row.id}`).toString('base64url');
}

function decodeCursor(cursor: string): { createdAt: Date; id: number } | null {
  try {
    const [iso, idPart] = Buffer.from(cursor, 'base64url').toString('utf8').split('|');
    const createdAt = new Date(iso);
    const id = Number(idPart);
    if (Number.isNaN(createdAt.getTime()) || !Number.isInteger(id)) return null;
    return { createdAt, id };
  } catch {
    return null;
  }
}

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
      createdAt: photo.createdAt.toISOString(),
      authorName: author.name,
      authorAvatarUrl: author.avatarUrl,
      averageRating: ratingRow ? Number(ratingRow.averageRating) : null,
      ratingCount: ratingRow ? Number(ratingRow.ratingCount) : 0,
      commentCount: commentRow ? Number(commentRow.commentCount) : 0,
    };
  });
}

export async function listPhotosPage(
  options: { clerkUserId?: string; cursor?: string | null; limit?: number } = {},
): Promise<PhotoPage> {
  const limit = options.limit ?? DEFAULT_PAGE_SIZE;
  const db = getDb();

  const conditions = [eq(fishPhotos.archived, false)];
  if (options.clerkUserId) {
    conditions.push(eq(fishPhotos.clerkUserId, options.clerkUserId));
  }

  const decodedCursor = options.cursor ? decodeCursor(options.cursor) : null;
  if (decodedCursor) {
    conditions.push(
      or(
        lt(fishPhotos.createdAt, decodedCursor.createdAt),
        and(eq(fishPhotos.createdAt, decodedCursor.createdAt), lt(fishPhotos.id, decodedCursor.id)),
      )!,
    );
  }

  const rows = await db
    .select()
    .from(fishPhotos)
    .where(and(...conditions))
    .orderBy(desc(fishPhotos.createdAt), desc(fishPhotos.id))
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const pageRows = rows.slice(0, limit);
  const lastRow = pageRows[pageRows.length - 1];

  const photos = await attachStats(pageRows);

  return {
    photos,
    nextCursor: hasMore && lastRow ? encodeCursor(lastRow) : null,
  };
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
