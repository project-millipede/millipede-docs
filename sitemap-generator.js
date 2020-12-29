const fs = require('fs');
const sitemap = require('nextjs-sitemap-generator');

const urls = [
  { baseUrl: 'https://millipede.me', targetDirectory: 'public/' },
  {
    baseUrl: 'https://privacy-shield.io',
    targetDirectory: 'public/privacy-shield'
  },
  {
    baseUrl: 'https://privly.io',
    targetDirectory: 'public/privly'
  },
  {
    baseUrl: 'https://privatesphere.org',
    targetDirectory: 'public/privatesphere'
  },
  {
    baseUrl: 'https://privatheit.org',
    targetDirectory: 'public/privatheit'
  },
  {
    baseUrl: 'https://encrypt.org',
    targetDirectory: 'public/encrypt'
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
