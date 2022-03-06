import { selectorFamily } from 'recoil';

import { viewportItemState, viewportNextItemState } from './states';
import { Viewport, ViewportNext } from './types';

export const viewportItemSelector = selectorFamily<Viewport, string>({
  key: 'viewport-item-selector',
  get:
    timelineId =>
    ({ get }) => {
      const viewportItem = get(viewportItemState(timelineId));
      return viewportItem;
    },
  set:
    timeline =>
    ({ set }, newValue) => {
      set(viewportItemState(timeline), newValue);
    }
});

export const viewportNextItemSelector = selectorFamily<ViewportNext, string>({
  key: 'viewport-next-item-selector',
  get:
    timelineId =>
    ({ get }) => {
      const viewportItem = get(viewportNextItemState(timelineId));
      return viewportItem;
    },
  set:
    timeline =>
    ({ set }, newValue) => {
      set(viewportNextItemState(timeline), newValue);
    }
});
