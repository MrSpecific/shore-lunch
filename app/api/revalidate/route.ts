import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') || req.headers.get('x-revalidation-token');
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { _type, slug } = (await req.json().catch(() => ({}))) || {};
  const slugValue = slug?.current || slug;
  const explicitPath = req.nextUrl.searchParams.get('path');
  const paths = new Set<string>(['/sitemap.xml']);

  if (explicitPath) {
    paths.add(explicitPath.startsWith('/') ? explicitPath : `/${explicitPath}`);
  }

  switch (_type) {
    case 'episode':
      if (slugValue) paths.add(`/episode/${slugValue}`);
      paths.add('/episodes');
      paths.add('/');
      break;
    case 'recipe':
      if (slugValue) paths.add(`/recipe/${slugValue}`);
      break;
    case 'page':
      if (slugValue) paths.add(`/${slugValue}`);
      break;
    case 'frontPage':
    case 'siteSettings':
      paths.add('/');
      break;
    case 'product':
    case 'productCollection':
      paths.add('/merch');
      break;
    default:
      if (slugValue) {
        paths.add(`/${slugValue}`);
      }
  }

  if (!paths.size) {
    return NextResponse.json({ message: 'No paths to revalidate' }, { status: 400 });
  }

  const pathList = [...paths];
  const revalidatedPaths: string[] = [];
  const failedPaths: Array<{ path: string; error: string }> = [];

  for (const path of pathList) {
    try {
      revalidatePath(path);
      revalidatedPaths.push(path);
    } catch (error) {
      failedPaths.push({ path, error: String((error as Error)?.message || error) });
    }
  }

  if (failedPaths.length) {
    return NextResponse.json(
      { revalidated: false, revalidatedPaths, failedPaths },
      { status: 500 }
    );
  }

  return NextResponse.json({ revalidated: true, revalidatedPaths });
}
