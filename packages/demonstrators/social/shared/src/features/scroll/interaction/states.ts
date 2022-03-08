import { atom } from 'recoil';

import { InteractionOption } from './types';

const initialState: InteractionOption = {
  activeIds: {
    header: true,
    media: false,
    content: false,
    sentiment: false,
    comments: false
  }
};

export const interactionOptionsState = atom({
  key: 'interaction-options',
  default: initialState
});
