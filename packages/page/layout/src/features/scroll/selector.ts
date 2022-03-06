import { selectorFamily } from 'recoil';

import { scrollState } from './states';

export const scrollIsActiveSelector = selectorFamily<boolean, string>({
  key: 'scroll-is-active-selector',
  get:
    scrollId =>
    ({ get }) => {
      const { scrollItems } = get(scrollState);
      return (
        scrollItems.findIndex(item => item === encodeURIComponent(scrollId)) !==
        -1
      );
    }
});
