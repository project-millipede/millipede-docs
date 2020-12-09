import { StateType } from 'typesafe-actions';

import theme from './features/theme/reducer';
import timeline from './features/timeline/reducer';

export const reducers = {
  theme,
  timeline
};

export type ThemeState = StateType<typeof theme>;
export type TimelineState = StateType<typeof timeline>;

export type RootState = StateType<typeof reducers>;
