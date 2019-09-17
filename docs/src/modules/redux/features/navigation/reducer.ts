import { getPages } from '../../../../pages';
import { StoreAction } from '../actionType';
import { CHANGE_NAVIGATION, CHANGE_PAGES, SETUP_NAVIGATION } from './actionTypes';
import { Page } from './type';

interface Props {
  activePage: Page;
  pages: Array<Page>;
}

export const initialState: Props = {
  activePage: {
    pathname: 'Test',
    title: ''
  },
  pages: []
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
    case CHANGE_PAGES:
      return {
        ...state,
        pages: getPages(action.payload.pathname)
      };
    default:
      return state;
  }
};

export default navigationReducer;
