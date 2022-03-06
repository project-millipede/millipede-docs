import createSvgPlugin from '@stefanprobst/next-svg';
import { readFile } from 'fs/promises';
import nextTranslate from 'next-translate';

const svgPlugin = createSvgPlugin(/* options */);

const info = JSON.parse(await readFile('./package.json'));

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    reactRoot: 'concurrent'
  },

  compiler: {
    // Enables the styled-components SWC transform, no babel plugin required
    styledComponents: true
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },

  publicRuntimeConfig: {
    // appVersion: version
    appVersion: info.version
  },

  webpack(config, _options) {
    // FIXME: https://github.com/vercel/next.js/discussions/30870
    config.infrastructureLogging = {
      level: 'error'
    };

    return config;
  }
};

export default nextTranslate(svgPlugin(nextConfig));
