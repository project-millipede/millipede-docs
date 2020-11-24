const webpack = require('webpack');
const pkg = require('../package.json');

const getFallback = isServer => {
  if (!isServer) {
    return {
      fs: false,
      process: false,
      buffer: false
    };
  }
};

const webpackConfig = ({ isServer }) => {
  return {
    mode: 'production',

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      fallback: {
        ...getFallback(isServer)
      },
    },

    module: {
      rules: [
        { test: /\.(ts|tsx)$/, loader: 'ts-loader' },
        {
          test: /\.mdx$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-react']
                ],
                plugins: [
                ]
              }
            },
            {
              loader: '@app/mdx-loader'
            },       
          ]
        },
        {
          test: /\.md$/,
          use: 'raw-loader'
        }
      ]
    },

    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          PROJECT_VERSION: JSON.stringify(pkg.version)
        }
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^encoding$/,
        contextRegExp: /node-fetch/,
      }),
    ]
  };
};

module.exports = webpackConfig;
