import webpack from 'webpack';

import { generateModulesPaths } from './transpile';

// import pkg from '../package.json';
const getFallback = isServer => {
  if (!isServer) {
    return {
      fs: false
    };
  }
};

export const webpackConfig = ({ isServer, modules }) => {
  const modulesPaths = generateModulesPaths(modules);

  const match = path =>
    modulesPaths.some(modulePath => {
      const transpiled = path.includes(modulePath);
      return transpiled;
    });

  return {
    mode: 'production',

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
                projectReferences: true
              }
            }
          ],
          include: match
        },
        {
          test: /\.mdx$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-react']],
                plugins: []
              }
            },
            {
              loader: '@app/mdx-loader'
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
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     PROJECT_VERSION: JSON.stringify(pkg.version)
      //   }
      // }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^encoding$/,
        contextRegExp: /node-fetch/
      })
    ]
  };
};
