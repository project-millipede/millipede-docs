import { PageTypes } from '@app/types';
import { atom } from 'recoil';

export interface NavigationState {
  pages: Array<PageTypes.Page>;
  flattenedPages: Array<PageTypes.FlattenedPage>;
  // activePage: PageTypes.Page;
  activePage: PageTypes.FlattenedPage;
  selectedPage: Array<string>;
  expandedPages: Array<string>;
}

export const initialState: NavigationState = {
  pages: [],
  flattenedPages: [],
  activePage: {
    pathname: ''
  },
  selectedPage: [],
  expandedPages: []
};

export const navigationState = atom({
  key: 'navigation',
  default: initialState
});
