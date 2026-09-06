import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { requireAdminUser } from '@lib/admin/auth';
import { setPhotoArchived, deletePhoto, isValidPhotoId } from '@lib/rateMyCatch';

function parsePhotoId(id: string): string | null {
  return isValidPhotoId(id) ? id : null;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdminUser();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const photoId = parsePhotoId(id);
  if (!photoId) {
    return NextResponse.json({ error: 'Invalid photo id' }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (typeof body?.archived !== 'boolean') {
    return NextResponse.json({ error: '"archived" must be a boolean' }, { status: 400 });
  }

  const photo = await setPhotoArchived(photoId, body.archived);
  if (!photo) {
    return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  }

  return NextResponse.json({ photo });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdminUser();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const photoId = parsePhotoId(id);
  if (!photoId) {
    return NextResponse.json({ error: 'Invalid photo id' }, { status: 400 });
  }

  const photo = await deletePhoto(photoId);
  if (!photo) {
    return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  }

  await del(photo.imageUrl).catch(() => {
    // Best-effort cleanup — the DB row is already gone, which is what matters for moderation.
  });

  return NextResponse.json({ photo });
}
