import { atom } from 'recoil';

export interface Layout {
  isDrawerExpanded: boolean;
}

const initialState: Layout = {
  isDrawerExpanded: false
};

export const layoutState = atom({
  key: 'layout',
  default: initialState
});
