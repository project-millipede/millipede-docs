import { StateType } from 'typesafe-actions';

import animation from './features/animation/reducer';
import theme from './features/theme/reducer';
import timeline from './features/timeline/reducer';

export const reducers = {
  animation,
  theme,
  timeline
};

export type AnimationState = StateType<typeof animation>;
export type ThemeState = StateType<typeof theme>;
export type TimelineState = StateType<typeof timeline>;

export type RootState = StateType<typeof reducers>;
