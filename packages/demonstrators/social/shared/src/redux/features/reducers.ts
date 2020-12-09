import { StateType } from 'typesafe-actions';

import timeline from './timeline/reducer';

export type TimelineState = StateType<typeof timeline>;

export const reducers = {
  timeline
};

export type RootState = StateType<typeof reducers>;
