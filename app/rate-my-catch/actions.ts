'use server';

import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { createComment, createPhoto, upsertRating } from '@lib/rateMyCatch';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic']);

export async function uploadCatchPhoto(formData: FormData): Promise<{ photoId: string }> {
  const { userId } = await auth();
  if (!userId) throw new Error('You must be signed in to upload a photo.');

  const file = formData.get('image');
  const caption = (formData.get('caption') as string | null)?.trim() || null;

  if (!(file instanceof File) || file.size === 0) {
    throw new Error('Please choose an image to upload.');
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error('Please upload a JPEG, PNG, WEBP, or HEIC image.');
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('Image must be smaller than 8MB.');
  }

  const blob = await put(`rate-my-catch/${userId}/${Date.now()}-${file.name}`, file, {
    access: 'public',
  });

  const photo = await createPhoto({
    clerkUserId: userId,
    imageUrl: blob.url,
    caption,
  });

  revalidatePath('/rate-my-catch');
  return { photoId: photo.id };
}

export async function rateCatchPhoto(photoId: string, hooks: number) {
  const { userId } = await auth();
  if (!userId) throw new Error('You must be signed in to rate a photo.');
  if (!Number.isInteger(hooks) || hooks < 1 || hooks > 5) {
    throw new Error('Rating must be between 1 and 5 hooks.');
  }

  await upsertRating({ photoId, clerkUserId: userId, stars: hooks });
  revalidatePath(`/rate-my-catch/${photoId}`);
  revalidatePath('/rate-my-catch');
}

export async function addCatchComment(photoId: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('You must be signed in to comment.');

  const body = (formData.get('body') as string | null)?.trim();
  if (!body) {
    throw new Error('Comment cannot be empty.');
  }
  if (body.length > 1000) {
    throw new Error('Comment must be under 1000 characters.');
  }

  await createComment({ photoId, clerkUserId: userId, body });

  revalidatePath(`/rate-my-catch/${photoId}`);
}
