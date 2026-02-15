export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = req.query.token || req.headers['x-revalidation-token'];
  if (token !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { _type, slug } = req?.body || {};
  const slugValue = slug?.current || slug;
  const explicitPath = req.query.path;
  const paths = new Set(['/sitemap.xml']);

  if (explicitPath) {
    paths.add(explicitPath.toString().startsWith('/') ? explicitPath.toString() : `/${explicitPath}`);
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
    return res.status(400).json({ message: 'No paths to revalidate' });
  }

  const pathList = [...paths];
  const results = await Promise.allSettled(
    pathList.map(async (path) => {
      await res.revalidate(path);
      return path;
    })
  );

  const revalidatedPaths = [];
  const failedPaths = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      revalidatedPaths.push(result.value);
      return;
    }

    failedPaths.push({
      path: pathList[index],
      error: String(result.reason?.message || result.reason),
    });
  });

  if (failedPaths.length) {
    return res.status(500).json({
      revalidated: false,
      revalidatedPaths,
      failedPaths,
    });
  }

  return res.json({ revalidated: true, revalidatedPaths });
}
