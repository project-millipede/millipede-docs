const { merge } = require('webpack-merge');
const { getWebpackConfig } = require('@app/webpack-build');
const nextTranslate = require('next-translate');

const modules = [
  '@app/houx',
  '@app/types',
  '@app/analytics',
  '@app/components',
  '@app/layout'
];

const nextConfig = {
  webpack: (config, options) => {
    // eslint-disable-next-line no-param-reassign
    options = {
      ...options,
      modules
    };
    const webpackConfig = getWebpackConfig();
    return merge(config, webpackConfig(options));
  },

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  target: 'serverless'
};

module.exports = nextTranslate(nextConfig);
