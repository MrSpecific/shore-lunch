import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { listPhotosPage } from '@lib/rateMyCatch';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');
  const mine = searchParams.get('mine') === '1';

  let clerkUserId: string | undefined;
  if (mine) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    clerkUserId = userId;
  }

  const page = await listPhotosPage({ clerkUserId, cursor });
  return NextResponse.json(page);
}
