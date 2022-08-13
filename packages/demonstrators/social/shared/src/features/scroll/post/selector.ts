import { selectorFamily } from 'recoil';

import { refPostScrollState } from './states';
import { RefPostScroll } from './types';

export const refPostScrollSelector = selectorFamily<
  RefPostScroll,
  { timelineId: string; postId: string }
>({
  key: 'ref-post-scroll-selector',
  get:
    ({ timelineId, postId }) =>
    ({ get }) => {
      const refPostScrollMap = get(refPostScrollState(postId));
      const refPostScroll = refPostScrollMap?.[timelineId];
      return refPostScroll;
    }
});
