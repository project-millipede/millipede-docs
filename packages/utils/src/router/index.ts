import { PageTypes } from '@app/types';
import isArray from 'lodash/isArray';

const flatten = <T>(pages: Array<T>, key: string) => {
  return pages.reduce<Array<Omit<T, 'children'> & { isParent?: boolean }>>(
    (flattenedPages, page) => {
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
        flattenedPages = flattenedPages.concat(flatten(page[key], key));
      }
      return flattenedPages;
    },
    []
  );
};

const getExpandedPages = (pathname: string) => {
  if (pathname === '/') {
    return ['/'];
  }
  return pathname
    .split('/')
    .map((_name, index, arr) => `${arr.slice(0, index + 1).join('/')}`);
};

const getActivePage = (
  flattenedPages: Array<PageTypes.FlattenedPage>,
  pathname: string
) => {
  const [selectedPage] = flattenedPages.filter(flattenedPage => {
    return pathname === flattenedPage.pathname;
  });
  return selectedPage
    ? selectedPage
    : ({ pathname: '/' } as PageTypes.FlattenedPage);
};

export { flatten, getExpandedPages, getActivePage };
