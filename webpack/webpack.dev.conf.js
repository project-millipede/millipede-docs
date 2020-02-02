/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const pkg = require('../package.json');

const MAX_CYCLES = 5;
let numCyclesDetected = 0;

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
    mode: 'development',

    node: {
      fs: setFs(isServer)
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: setSentry(isServer)
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'happypack/loader?id=ts'
        },
        {
          test: /\.mdx$/,
          loader: 'happypack/loader?id=mdx'
        },
        {
          test: /\.md$/,
          use: 'raw-loader'
        }
      ]
    },

    plugins: [
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // include specific files based on a RegExp
        // include: /src/,
        // include: /src/ | /docs/ | /pages/,
        // add errors to webpack instead of warnings
        failOnError: false,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
        onStart() {
          numCyclesDetected = 0;
        },
        onDetected({ paths, compilation }) {
          numCyclesDetected += 1;
          if (numCyclesDetected < MAX_CYCLES) {
            compilation.warnings.push(new Error(paths.join(' -> ')));
          }
        },
        onEnd({ compilation }) {
          if (numCyclesDetected > MAX_CYCLES) {
            compilation.warnings.push(
              new Error(
                `Detected ${numCyclesDetected} cycles which exceeds configured limit of ${MAX_CYCLES}`
              )
            );
          }
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          PROJECT_VERSION: JSON.stringify(pkg.version)
        }
      }),
      new HappyPack({
        // id declaration references to the loader definition: 'happypack/loader?id=ts'
        id: 'ts',
        threads: 6,
        loaders: [
          {
            path: 'ts-loader',
            query: { happyPackMode: true },
            options: {
              // disable type checker - typechecking is handeled by fork-ts-checker-webpack-plugin
              transpileOnly: true
            }
          }
        ]
      }),
      new HappyPack({
        id: 'mdx',
        threads: 4,
        loaders: [
          {
            path: 'babel-loader'
          },
          {
            loader: path.join(__dirname, '../dist/loader/mdx-custom-loader')
          }
        ]
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
              loader: path.join(__dirname, '../dist/loader/mdx-custom-loader'),
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
