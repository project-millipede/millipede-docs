/* eslint-disable import/no-extraneous-dependencies */
import compose from 'lodash/fp/compose';
import merge from 'webpack-merge';

import webpackConfig from './webpack/webpack.dev.conf';

const composeFn = compose();
// mdx()
// Add more plugins here

export default composeFn({
  webpack(config, options) {
    /**
     * The following snippet was borrowed from https://github.com/zeit/next.js/issues/5923
     */

    const { isServer } = options;
    const {
      optimization: {
        splitChunks: { cacheGroups }
      }
    } = config;

    if (!isServer) {
      delete cacheGroups.react;

      cacheGroups.default = false;

      cacheGroups.vendors = {
        name: 'vendors',
        test: /[\\/](node_modules|packages)[\\/]/,
        enforce: true,
        priority: 20
      };

      cacheGroups.commons = {
        name: 'commons',
        minChunks: 2,
        priority: 10
      };
    }

    return merge(config, webpackConfig);

    // // Do not run type checking twice:
    // if (options.isServer && options.dev) config.plugins.push(new ForkTsCheckerWebpackPlugin());
    // return config;
  },

  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
});
