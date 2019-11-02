const path = require('path');
const sitemapGenerator = require('nextjs-sitemap-generator');

const baseUrl = 'https://millipede.me';

sitemapGenerator({
  baseUrl,
  pagesDirectory: path.join(__dirname, 'pages'),
  targetDirectory: 'public/'
});
