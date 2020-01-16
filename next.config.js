/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
const webpackConfigProd = require('./webpack/webpack.prod.conf');
const webpackConfigDev = require('./webpack/webpack.dev.conf');

const configuration = {
  env: {
    PROJECT_ROOT: __dirname,
    PROJECT_ROOT_DIRNAME: __dirname,
    PROJECT_ROOT_CWD: process.cwd()
  },

  webpack(config, options) {
    return merge(config, process.env.NODE_ENV === "development" ? webpackConfigDev(options) : webpackConfigProd(options));
  },

  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: { modern: true, documentMiddleware: true }
};

module.exports = configuration;

/* next.config in ts */
/*
import merge from 'webpack-merge';
import webpackConfig from './webpack/webpack.prod.conf';

const configuration = {
  webpack(config: webpack.Configuration, options) {
    return merge(config, webpackConfig(options));
  },

  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: { modern: true, documentMiddleware: true }
};

export default configuration;
*/
