import { StateType } from 'typesafe-actions';

import animation from './animation/reducer';

export type AnimationState = StateType<typeof animation>;

export const reducers = {
  animation
};

export type RootState = StateType<typeof reducers>;
