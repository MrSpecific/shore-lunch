const Robots = () => {
  return <div>Should not be navigated via Next Link. Use a standard {`<a>`} tag!</div>;
};

export async function getServerSideProps({ req, res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`
Sitemap: https://${req.headers.host}/sitemap.xml

# Block all crawlers for /api
User-agent: *
Disallow: /api/*

# Allow all crawlers
User-agent: *
Allow: /*
`);
  res.end();

  return { props: {} };
}

export default Robots;
