import { StateType } from 'typesafe-actions';

import theme from './features/theme/reducer';

export const reducers = {
  theme
};

export type ThemeState = StateType<typeof theme>;

export type RootState = StateType<typeof reducers>;
