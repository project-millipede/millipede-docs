import { atom, selector } from 'recoil';

export interface InteractionOption {
  activeIds: { [key: string]: boolean };
}

export const interactionOptionsState = atom<InteractionOption>({
  key: 'interactionOptionsState',
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

export const interactionOptionsSelector = selector({
  key: 'interactionOptionsSelector',
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
