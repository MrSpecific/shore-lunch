const path = require('path');

const aliasMapping = {
  '@styles': (filename) => path.resolve(__dirname, `styles/${filename}`),
  '@settings': (filename) => path.resolve(__dirname, `styles/settings/${filename}`),
  '@images': (filename) => path.resolve(__dirname, `public/images/${filename}`),
};

module.exports = {
  plugins: {
    'postcss-import': {
      root: path.resolve(__dirname, 'src'),
      skipDuplicates: true,
      resolve: (id, basedir, importOptions) => {
        const [aliasName, filename] = id.split('/');
        if (!aliasMapping[aliasName]) return id;
        return aliasMapping[aliasName](filename);
      },
    },
    'postcss-pxtorem': {
      propList: ['*'],
    },
    // CSS modules are processed separately, so each needs the shared definitions.
    '@csstools/postcss-global-data': {
      files: [path.resolve(__dirname, 'styles/settings/breakpoints.css')],
    },
    'postcss-preset-env': {
      stage: 0,
      features: {
        'custom-media-queries': { preserve: false },
      },
      autoprefixer: {
        grid: true,
      },
    },
  },
};
