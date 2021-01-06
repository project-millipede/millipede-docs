import { PageTypes } from '@app/types';
import isArray from 'lodash/isArray';

const flattenPages = (pages: Array<PageTypes.Page>, key: string) => {
  return pages.reduce((flattenedPages, page) => {
    if (page[key]) {
      flattenedPages.push({
        ...page,
        isParent: true
      });
    } else {
      flattenedPages.push({
        ...page,
        isParent: false
      });
    }

    if (isArray(page[key])) {
      flattenedPages = flattenedPages.concat(flattenPages(page[key], key));
    }
    return flattenedPages;
  }, [] as Array<PageTypes.FlattenedPage>);
};

const findExpandedPages = (
  flattenedPages: Array<PageTypes.FlattenedPage>,
  pathname: string
) => {
  const expandedPages = flattenedPages
    .filter(flattenedPage => {
      return (
        flattenedPage.isParent &&
        pathname.includes(`/docs/${flattenedPage.pathname}`)
      );
    })
    .map(expandedPage => `/docs/${expandedPage.pathname}`);
  return expandedPages;
};

const findSelectedPage = (
  flattenedPages: Array<PageTypes.FlattenedPage>,
  pathname: string
) => {
  const selectedPage = flattenedPages
    .filter(flattenedPage => {
      return pathname === `/docs/${flattenedPage.pathname}`;
    })
    .map(selectedPage => `/docs/${selectedPage.pathname}`);
  return selectedPage;
};

const findSelectedPageAsObject = (
  flattenedPages: Array<PageTypes.FlattenedPage>,
  pathname: string
) => {
  if (pathname.indexOf('?') > 0) {
    pathname = pathname.substring(0, pathname.indexOf('?'));
  }

  if (pathname.indexOf('#') > 0) {
    pathname = pathname.substring(0, pathname.indexOf('#'));
  }

  if (pathname === '/') {
    return {
      pathname: '/'
    };
  }

  const [selectedPage] = flattenedPages.filter(flattenedPage => {
    return pathname === `/docs/${flattenedPage.pathname}`;
  });
  return selectedPage ? selectedPage : null;
};

export {
  flattenPages,
  findExpandedPages,
  findSelectedPage,
  findSelectedPageAsObject
};
