const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = [
  { ignores: ['.next/**', 'node_modules/**'] },
  ...nextCoreWebVitals,
  prettierConfig,
];
