const fs = require('fs');
const sitemap = require('nextjs-sitemap-generator');

const urls = [
  { baseUrl: 'https://millipede.me', targetDirectory: 'public/' },
  {
    baseUrl: 'https://privacy-shield.io',
    targetDirectory: 'public/privacy-shield'
  },
  {
    baseUrl: 'https://privatesphere.org',
    targetDirectory: 'public/privatesphere'
  },
  {
    baseUrl: 'https://encrypt.org',
    targetDirectory: 'public/encrypt'
  },
  // international domain
  {
    baseUrl: 'https://xn--privatsphre-t8a.de',
    targetDirectory: 'public/privatsphaere'
  }
];

const ignoreIndexFiles = true;

urls.forEach(url => {
  !fs.existsSync(url.targetDirectory) && fs.mkdirSync(url.targetDirectory);

  sitemap({
    baseUrl: url.baseUrl,
    ignoreIndexFiles,
    pagesDirectory: __dirname + '/.next/server/pages',
    targetDirectory: url.targetDirectory,
    nextConfigPath: __dirname + '/next.config.js',
    ignoredExtensions: ['png', 'jpg'],
    pagesConfig: {
      '/': {
        priority: '0.5',
        changefreq: 'daily'
      }
    }
  });
});
