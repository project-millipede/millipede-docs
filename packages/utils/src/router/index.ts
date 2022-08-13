import { PageTypes } from '@app/types';

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

      if (Array.isArray(page[key])) {
        // eslint-disable-next-line no-param-reassign
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
  pages: Array<PageTypes.FlattenedPage>,
  pathname: string
) => {
  const [selectedPage] = pages.filter(page => {
    return pathname === page.pathname;
  });
  return selectedPage
    ? selectedPage
    : ({ pathname: '/' } as PageTypes.FlattenedPage);
};

export { flatten, getExpandedPages, getActivePage };
