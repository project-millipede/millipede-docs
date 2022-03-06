import { selector } from 'recoil';

import { interactionOptionsState } from './states';

export const interactionOptionsSelector = selector({
  key: 'interaction-options-selector',
  get: ({ get }) => {
    const interactionOptions = get(interactionOptionsState);
    const { activeIds } = interactionOptions;
    const usedSliceIds = Object.entries(activeIds).reduce<Array<string>>(
      (acc, [id, value]) => {
        if (value) {
          acc.push(id);
        }
        return acc;
      },
      []
    );
    return usedSliceIds;
  }
});
