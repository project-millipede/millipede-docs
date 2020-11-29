const webpack = require('webpack');
const pkg = require('../package.json');

const getFallback = isServer => {
  if (!isServer) {
    return {
      fs: false,
      process: require.resolve('process/'),
      buffer: require.resolve('buffer/')
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
        { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
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
				'Buffer': ['buffer', 'Buffer'],
				'process': 'process',
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
