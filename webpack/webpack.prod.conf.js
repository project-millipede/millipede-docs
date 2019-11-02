const path = require('path');
const webpack = require('webpack');

const pkg = require('../package.json');

const setFs = isServer => {
  // Fixes npm packages that depend on `fs` module
  if (!isServer) {
    return 'empty';
  }
  return true;
};

const setSentry = isServer => {
  if (!isServer) {
    return {
      '@sentry/node': '@sentry/browser'
    };
  }
  return {
    '@sentry/node': '@sentry/node'
  };
};

const webpackConfig = ({ isServer }) => {
  return {
    mode: 'production',

    node: {
      fs: setFs(isServer)
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: setSentry(isServer)
    },

    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: 'ts-loader' },
        {
          test: /\.mdx$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: path.join(__dirname, '../dist/webpack/loader/mdx-custom-loader'),
              options: {
                remarkPlugins: [
                  // options
                ]
              }
            }
          ]
        },
        {
          test: /\.md$/,
          use: 'raw-loader'
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PROJECT_VERSION: JSON.stringify(pkg.version)
        }
      })
    ]
  };
};

module.exports = webpackConfig;

/* webpack.prod.conf in ts */

/*
import path from 'path';
import webpack from 'webpack';

import pkg from '../package.json';
*/

// import * as options from './remarkReactComponents';

/*
const setFs = isServer => {
  // Fixes npm packages that depend on `fs` module
  if (!isServer) {
    return 'empty';
  }
  return true;
};

// const webpackConfig = ({ isServer }): webpack.Configuration => {
const webpackConfig = ({ isServer }) => {
  return {
    mode: 'production',

    node: {
      fs: setFs(isServer)
    },

    // The context is two levels out, because next does currently not support
    // configurations (next.config) in typescript
    // context: path.resolve(__dirname, '../../'),
    // context: path.resolve(__dirname, '../'),

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },

    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: 'ts-loader' },
        {
          test: /\.mdx$/,
          // use: [path.join(__dirname, './loader/mdx-custom-loader')]
          use: [
            {
              loader: 'babel-loader'
            },
            {
              // loader: path.join(__dirname, './loader/mdx-custom-loader'),
              loader: path.join(__dirname, '../dist/webpack/loader/mdx-custom-loader'),
              options: {
                remarkPlugins: [
                  // options
                ]
              }
            }
          ]
        },
        {
          test: /\.md$/,
          use: 'raw-loader'
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PROJECT_VERSION: JSON.stringify(pkg.version)
        }
      })
    ]
  };
};

// const webpackConfig: webpack.Configuration = merge(baseWebpackConfig, webpackDevConfig);
// export default webpackConfig;

// export default webpackConfig;
*/
