import process from 'process';

import { webpackConfig as webpackConfigDev } from './webpack.dev.conf';
import { webpackConfig as webpackConfigProd } from './webpack.prod.conf';

export const getWebpackConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return webpackConfigDev;
  }
  return webpackConfigProd;
};
