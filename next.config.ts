import compose from 'lodash/fp/compose';
import merge from 'webpack-merge';

import webpackConfig from './webpack/webpack.dev.conf';

const composeFn = compose();
// mdx()
// Add more plugins here

export default composeFn({
  webpack(config, options) {
    return merge(config, webpackConfig);

    // // Do not run type checking twice:
    // if (options.isServer && options.dev) config.plugins.push(new ForkTsCheckerWebpackPlugin());
    // return config;
  },
  target: "serverless",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"]
});
