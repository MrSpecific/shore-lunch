export default async function handler(req, res) {
  let { path } = req.query;

  // Check for secret to confirm this is a valid request
  if (req.query.token !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { _type, slug } = req?.body;

  if (slug) {
    path = `/${slug.current || slug}`;
  }

  if (!path) {
    return res.status(401).json({ message: 'No Path Specified' });
  }

  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(path);

    return res.json({ revalidated: true, path });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send(`Error revalidating | Path: ${path}`);
  }
}
