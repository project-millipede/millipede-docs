import { atom } from 'recoil';

import { Scroll } from './types';

const initialState: Scroll = {
  scrollItems: []
};

export const scrollState = atom({
  key: 'scroll',
  default: initialState
});
