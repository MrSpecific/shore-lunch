import { NextResponse } from 'next/server';
import { requireAdminUser } from '@lib/admin/auth';
import { listAllPhotosForAdmin } from '@lib/rateMyCatch';

export async function GET() {
  const admin = await requireAdminUser();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const photos = await listAllPhotosForAdmin();
  return NextResponse.json({ photos });
}
