import { atom } from 'recoil';

import { PartialViewElement, TView } from '../../../types';

export interface NavigationState {
  views: Array<TView>;
  viewElements: Array<PartialViewElement>;
}

const initialState: NavigationState = {
  views: [],
  viewElements: []
};

export const viewNavigationState = atom({
  key: 'view-navigation',
  default: initialState
});
