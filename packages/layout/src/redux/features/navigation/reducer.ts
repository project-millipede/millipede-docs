import { Page } from '@app/types';

import { loadPages } from '../../../pages';
import { determineActivePage, flattenPages } from '../../../utils/router';
import { StoreAction } from '../actionType';
import { LOAD_PAGES } from './actionTypes';

export interface NavigationProps {
  pages: Array<Page>;
  flattenedPages: Array<Page>;
  activePage: Page;
}

export const initialState: NavigationProps = {
  pages: [],
  flattenedPages: [],
  activePage: {
    pathname: ''
  }
};

const navigationReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case LOAD_PAGES: {
      const { pathname } = action.payload;
      const pages = loadPages(pathname, state.pages);
      const flattenedPages = flattenPages(pages);
      const activePage = determineActivePage(pages, pathname);
      return {
        ...state,
        pages,
        flattenedPages,
        activePage
      };
    }
    default:
      return state;
  }
};

export default navigationReducer;
