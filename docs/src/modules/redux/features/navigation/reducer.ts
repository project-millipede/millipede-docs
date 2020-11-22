import { Page } from '../../../../../../src/typings/data/import';
import { loadPages } from '../../../../pages';
import { determineActivePage, flattenPages } from '../../../utils/router';
import { StoreAction } from '../actionType';
import { LOAD_PAGES } from './actionTypes';

interface Props {
  pages: Array<Page>;
  flattenedPages: Array<Page>;
  activePage: Page;
}

export const initialState: Props = {
  pages: [],
  flattenedPages: [],
  activePage: {
    pathname: '',
    title: ''
  }
};

const navigationReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
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
