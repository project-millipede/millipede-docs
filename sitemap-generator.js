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
    baseUrl: 'https://privatheit.org',
    targetDirectory: 'public/privatheit'
  }
];

const ignoreIndexFiles = true;

urls.forEach(url => {
  !fs.existsSync(url.targetDirectory) && fs.mkdirSync(url.targetDirectory);

  sitemap({
    baseUrl: url.baseUrl,
    ignoreIndexFiles,
    pagesDirectory: __dirname + '/pages',
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
