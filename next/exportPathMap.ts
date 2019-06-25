import { findPages } from '../docs/src/modules/utils/find';

const LANGUAGES = ['en', 'de'];

const exportPathMap = () => {
  const pages = findPages();
  const map = {};

  function traverse(pages2, userLanguage) {
    const prefix = userLanguage === 'en' ? '' : `/${userLanguage}`;

    pages2.forEach(page => {
      if (!page.children) {
        map[`${prefix}${page.pathname}`] = {
          page: page.pathname,
          query: {
            userLanguage
          }
        };
        return;
      }

      traverse(page.children, userLanguage);
    });
  }

  // We want to speed-up the build of pull requests.
  if (process.env.PULL_REQUEST === 'true') {
    traverse(pages, 'en');
  } else {
    LANGUAGES.forEach(userLanguage => {
      traverse(pages, userLanguage);
    });
  }

  return map;
};

export default exportPathMap;
