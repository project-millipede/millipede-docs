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

const webpackConfig = ({ isServer }) => {
  return {
    mode: 'production',

    node: {
      fs: setFs(isServer)
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
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
              loader: path.join(__dirname, '../dist/loader/mdx-custom-loader')
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
