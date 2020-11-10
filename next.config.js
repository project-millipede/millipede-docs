const { merge } = require('webpack-merge');

const webpackConfigProd = require('./webpack/webpack.prod.conf');
const webpackConfigDev = require('./webpack/webpack.dev.conf');

const nextTranslate = require("next-translate");

const nextConfig = {
  webpack: (config, options) => {
    return merge(
      config,
      process.env.NODE_ENV === 'development'
        ? webpackConfigDev(options)
        : webpackConfigProd(options)
    );
  },

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  target: 'serverless',
};

module.exports = nextTranslate(nextConfig)