import _ from 'lodash';

import { Page } from '../../../../src/typings/data/import';

const findActivePage = (currentPages: Array<Page>, pathname: string): Page => {
  const activePage = _.find(currentPages, (page: any) => {
    if (page.children) {
      if (pathname.indexOf(`${page.pathname}/`) === 0) {
        // Check if one of the children matches (for /components)
        return findActivePage(page.children, pathname);
      }
    }

    // Should be an exact match if no children
    return pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== pathname) {
    return findActivePage(activePage.children, pathname);
  }

  return activePage;
};

const determineCurrenPathname = (pathname: string) => {
  // Add support for leading / in development mode.
  if (pathname !== '/') {
    // The leading / is only added to support static hosting (resolve /index.html).
    // We remove it to normalize the pathname.
    // See `_rewriteUrlForNextExport` on Next.js side.
    return pathname.replace(/\/$/, '');
  }
  return pathname;
};

const determineActivePage = (pages: Array<Page>, pathname: string) => {
  const currentPathname = determineCurrenPathname(pathname);
  return findActivePage(pages, currentPathname);
};

const flattenPages = (pages: Array<Page>, current: Array<Page> = []) => {
  return pages.reduce((items, item) => {
    if (item.children && item.children.length > 1) {
      items = flattenPages(item.children, items);
    } else {
      items.push(item.children && item.children.length === 1 ? item.children[0] : item);
    }
    return items;
  }, current);
};

export { findActivePage, determineCurrenPathname, determineActivePage, flattenPages };
