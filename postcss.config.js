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
    'postcss-preset-env': {
      stage: 0,
      autoprefixer: {
        grid: true,
      },
    },
  },
};
