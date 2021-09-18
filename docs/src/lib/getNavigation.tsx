import { loadPages } from '@app/layout';
import { PageTypes } from '@app/types';
import { RouterUtils } from '@app/utils';
import isArray from 'lodash/isArray';
import { GetStaticPropsContext } from 'next';
import path from 'path';

export const getNavigation = async (ctx: GetStaticPropsContext) => {
  const { params: { slug } = { slug: [] } } = ctx;

  const pathname = isArray(slug) ? slug.join(path.sep) : slug;

  const pages = loadPages();
  const flattenedPages = RouterUtils.flatten<PageTypes.Page>(pages, 'children');
  const activePage = RouterUtils.getActivePage(flattenedPages, pathname);
  const expandedPages = RouterUtils.getExpandedPages(activePage.pathname);

  return {
    navigation: {
      pages,
      flattenedPages,
      activePage,
      expandedPages
    }
  };
};
