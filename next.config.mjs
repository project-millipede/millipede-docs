/** @type {import('next').NextConfig} */
import createSvgPlugin from '@stefanprobst/next-svg';
import { readFile } from 'fs/promises';

const svgPlugin = createSvgPlugin(/* options */);

const info = JSON.parse(await readFile('./package.json'));

const nextConfig = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en'
  },

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  compiler: {
    // Enables the styled-components SWC transform, no babel plugin required
    styledComponents: true,
    emotion: true
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  publicRuntimeConfig: {
    appVersion: info.version
  },

  webpack(config, _options) {
    // FIXME: https://github.com/vercel/next.js/discussions/30870
    // eslint-disable-next-line no-param-reassign
    config.infrastructureLogging = {
      level: 'error'
    };

    return config;
  }
};

export default svgPlugin(nextConfig);
