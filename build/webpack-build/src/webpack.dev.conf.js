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
    mode: 'development',

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      fallback: {
        ...getFallback(isServer)
      }
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              },
            },
          ],
        },
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
          ],
        },
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
    ]
  };
};

module.exports = webpackConfig;