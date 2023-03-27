const createNextPluginPreval = require('next-plugin-preval/config');
const withNextPluginPreval = createNextPluginPreval();

module.exports = withNextPluginPreval({
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
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
});
