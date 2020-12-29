import fs from 'fs';
import webpack from 'webpack';

import { generateModulesPaths } from './transpile';

const pkg = fs.readFileSync('./package.json', 'utf8');
const version = JSON.parse(pkg).version || 0;

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
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PROJECT_VERSION: JSON.stringify(version)
        }
      })
    ]
  };
};
