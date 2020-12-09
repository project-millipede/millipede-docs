import webpack from 'webpack';

import { generateModulesPaths } from './transpile';


// import pkg from '../package.json';
const getFallback = isServer => {
  if (!isServer) {
    return {
      fs: false,
      process: require.resolve('process/'),
      buffer: require.resolve('buffer/')
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
                transpileOnly: true,
                projectReferences: true
              }
            }
          ],
          exclude: /node_modules/,
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
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process'
      })
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     PROJECT_VERSION: JSON.stringify(pkg.version)
      //   }
      // })
    ]
  };
};
