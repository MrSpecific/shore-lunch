import { pgTable, serial, integer, text, timestamp, smallint, unique, index } from 'drizzle-orm/pg-core';

export const fishPhotos = pgTable('fish_photos', {
  id: serial('id').primaryKey(),
  clerkUserId: text('clerk_user_id').notNull(),
  imageUrl: text('image_url').notNull(),
  caption: text('caption'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const fishRatings = pgTable(
  'fish_ratings',
  {
    id: serial('id').primaryKey(),
    photoId: integer('photo_id')
      .notNull()
      .references(() => fishPhotos.id, { onDelete: 'cascade' }),
    clerkUserId: text('clerk_user_id').notNull(),
    stars: smallint('stars').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    unique('fish_ratings_photo_user_unique').on(table.photoId, table.clerkUserId),
    index('fish_ratings_photo_id_idx').on(table.photoId),
  ],
);

export const fishComments = pgTable(
  'fish_comments',
  {
    id: serial('id').primaryKey(),
    photoId: integer('photo_id')
      .notNull()
      .references(() => fishPhotos.id, { onDelete: 'cascade' }),
    clerkUserId: text('clerk_user_id').notNull(),
    body: text('body').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('fish_comments_photo_id_idx').on(table.photoId)],
);
