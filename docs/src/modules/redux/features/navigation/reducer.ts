import { Page } from '../../../../../../src/typings/data/import';
import { loadPages } from '../../../../pages';
import { determineActivePage, flattenPages } from '../../../utils/router';
import { StoreAction } from '../actionType';
import { CHANGE_NAVIGATION, LOAD_PAGES, SETUP_NAVIGATION } from './actionTypes';

interface Props {
  pages: Array<Page>;
  flattenedPages: Array<Page>;
  activePage: Page;
}

export const initialState: Props = {
  pages: [],
  flattenedPages: [],
  activePage: {
    pathname: 'Test',
    title: ''
  }
};

const navigationReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case SETUP_NAVIGATION:
      return {
        ...state,
        pages: action.payload.pages
      };
    case CHANGE_NAVIGATION:
      return {
        ...state,
        activePage: action.payload.activePage
      };
    case LOAD_PAGES: {
      const pages = loadPages(action.payload.pathname, state.pages);
      const flattenedPages = flattenPages(pages);
      const activePage = determineActivePage(pages, action.payload.pathname);
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
