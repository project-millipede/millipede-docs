module.exports = {
  siteUrl: 'https://millipede.me',

  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,

  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    // policies: [
    //   {
    //     userAgent: '*',
    //     allow: '/'
    //   }
    // ],
    additionalSitemaps: [
      'https://millipede.me/server-sitemap.xml' // <==== Add here
    ]
  }
};
