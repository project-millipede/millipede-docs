const { merge } = require('webpack-merge');
const { getWebpackConfig } = require('@app/webpack-build');
const nextTranslate = require('next-translate');

const modules = [
  '@app/houx',
  '@app/utils',
  '@app/render-utils',
  '@app/types',
  '@app/analytics',
  '@app/components',
  '@app/layout',
  '@page/illustrations',
  '@page/components',
  '@page/layout',
  '@page/landing',
  '@demonstrator/types',
  '@demonstrator/components',
  '@demonstrator/layout',
  '@demonstrators-social/data',
  '@demonstrators-social/components',
  '@demonstrators-social/shared',
  '@demonstrators-social/flow',
  '@demonstrators-social/layout'
];

const nextConfig = {
  webpack: (config, options) => {
    // eslint-disable-next-line no-param-reassign
    options = {
      ...options,
      modules
    };
    const webpackConfig = getWebpackConfig();
    return merge(config, webpackConfig(options));
  },

  future: {
    webpack5: true
  },

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

module.exports = nextTranslate(nextConfig);
