const getWebpackConfig = require("@app/webpack-build")

const nextTranslate = require("next-translate");
const { merge } = require('webpack-merge');

const webpackConfig = getWebpackConfig()

const withTM = require('next-transpile-modules')(['@app/houx', '@app/types', '@app/analytics', '@app/components', '@app/layout'],  { unstable_webpack5: true });

const nextConfig = {
  webpack: (config, options) => {
    return merge(
      config,
      webpackConfig(options)
    );
  },

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  target: 'serverless',
};

module.exports = withTM(nextTranslate(nextConfig))