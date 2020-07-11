/* eslint-disable import/no-extraneous-dependencies */

const { merge } = require('webpack-merge');

const webpackConfigProd = require('./webpack/webpack.prod.conf');
const webpackConfigDev = require('./webpack/webpack.dev.conf');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = { en: 'en', de: 'de' };

const configuration = {
  webpack(config, options) {
    return merge(
      config,
      process.env.NODE_ENV === 'development'
        ? webpackConfigDev(options)
        : webpackConfigProd(options)
    );
  },

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  target: 'serverless',

  publicRuntimeConfig: {
    localeSubpaths
  },

  experimental: {
    // modern: true,
    async rewrites() {
      return [...nextI18NextRewrites(localeSubpaths)];
    }
  }
};

module.exports = configuration;

/* next.config in ts */
/*
import { merge } from 'webpack-merge';
import webpackConfig from './webpack/webpack.prod.conf';

const configuration = {
  webpack(config: webpack.Configuration, options) {
    return merge(config, webpackConfig(options));
  },

  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: { modern: true }
};

export default configuration;
*/
