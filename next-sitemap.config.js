/**
 * Only provide a sitemap for the primary domain "millipede.me".
 * Do not generate and submit sitemaps for companion domains, redirecting to the primary.
 *
 * The domain "encrypt.org" should be swapped for the primary due to its quality;
 * both term and extension provide the best memorability.
 *
 * Available domains
 * - millipede.me // primary
 * - encrypt.org,
 * - privateness.org or
 * - privatsphäre.de // international domain
 */

module.exports = {
  siteUrl: 'https://millipede.me',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 1000
};
