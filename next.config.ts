/* eslint-disable import/no-extraneous-dependencies */
import merge from 'webpack-merge';

import webpackConfig from './webpack/webpack.prod.conf';

export const configuration = {
  webpack(config, options) {
    return merge(config, webpackConfig);
  },

  // exportPathMap,
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: { modern: true }
};

export default configuration;
