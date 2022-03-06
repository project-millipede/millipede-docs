import { atomFamily } from 'recoil';

import { Viewport, ViewportNext } from './types';

const initialState: Viewport = {
  viewportItem: {},
  offsetTop: 0
};

export const viewportItemState = atomFamily<Viewport, string>({
  key: 'viewport-item',
  default: initialState
});

const initialNextState: ViewportNext = {
  viewportItem: null
};

export const viewportNextItemState = atomFamily<ViewportNext, string>({
  key: 'viewport-next-item',
  default: initialNextState
});
