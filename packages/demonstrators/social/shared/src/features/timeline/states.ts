import { atom } from 'recoil';

import { Timeline } from './types';

const initialState: Timeline = {
  entities: {
    usecases: {},
    users: {},
    timelines: {},
    posts: {},
    comments: {},
    votes: {}
  },
  result: ''
};

export const timelineState = atom<Timeline>({
  key: 'timeline',
  default: initialState
});
