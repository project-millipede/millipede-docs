import { selector } from 'recoil';

import { interactionOptionsState } from './states';
import { TSliceVariant } from './types';

export const interactionOptionsSelector = selector({
  key: 'interaction-options-selector',
  get: ({ get }) => {
    const interactionOptions = get(interactionOptionsState);
    const { activeIds } = interactionOptions;
    const usedSliceIds = Object.entries(activeIds).reduce<Array<TSliceVariant>>(
      (acc, [id, value]) => {
        if (value) {
          acc.push(id as TSliceVariant);
        }
        return acc;
      },
      []
    );
    return usedSliceIds;
  }
});
