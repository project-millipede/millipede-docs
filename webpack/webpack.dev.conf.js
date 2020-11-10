const path = require('path');
const webpack = require('webpack');

const pkg = require('../package.json');

const getFallback = isServer => {
  if (!isServer) {
    return {
      fs: false
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
              loader: 'babel-loader'
            },
            {
              loader: path.join(__dirname, '../dist/loader/mdx-custom-loader')
            },
          
          ],
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
      }),
    ]

  };
};

module.exports = webpackConfig;