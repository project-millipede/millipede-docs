import { atom } from 'recoil';

import { InteractionOption } from './types';

export const interactionOptionsState = atom<InteractionOption>({
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
