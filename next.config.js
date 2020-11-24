const getWebpackConfig = require("@app/webpack-build")

const nextTranslate = require("next-translate");
const { merge } = require('webpack-merge');

const webpackConfig = getWebpackConfig()

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

module.exports = nextTranslate(nextConfig)