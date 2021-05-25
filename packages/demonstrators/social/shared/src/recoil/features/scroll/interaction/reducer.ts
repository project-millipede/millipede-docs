import { atom, selector } from 'recoil';

import { InteractionOption } from './types';

const interactionOptionsState = atom<InteractionOption>({
  key: 'interaction-options',
  default: {
    activeIds: {
      header: true,
      media: false,
      content: false,
      sentiment: false,
      comments: false
    }
  }
});

const interactionOptionsSelector = selector({
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

export const states = {
  interactionOptionsState
};

export const reducers = {};

export const selectors = { interactionOptionsSelector };
