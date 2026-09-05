module.exports = {
  // The old `i18n` config (single locale 'en') isn't supported in the App
  // Router, and prefixed every URL with /en/. Dropped in favor of clean
  // paths, with a permanent redirect below for any old /en/* links.
  async redirects() {
    return [
      {
        source: '/home/:path*',
        destination: `${process.env.NEXT_PUBLIC_ABOUT_GO_CAMP_LINK}/:path*`,
        permanent: true,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        // port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.schema.io',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  // Turbopack is the default builder as of Next.js 16; this is what
  // `next build`/`next dev` actually use. The webpack() fn below is kept
  // only as a fallback for `next build --webpack`.
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
};
