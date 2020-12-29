import { PageTypes } from '@app/types';
import { atom } from 'recoil';

export interface NavigationState {
  pages: Array<PageTypes.Page>;
  flattenedPages: Array<PageTypes.FlattenedPage>;
  // activePage: PageTypes.Page;
  activePage: PageTypes.FlattenedPage;
}

export const initialState: NavigationState = {
  pages: [],
  flattenedPages: [],
  activePage: {
    pathname: ''
  }
};

export const navigationState = atom({
  key: 'navigation',
  default: initialState
});
