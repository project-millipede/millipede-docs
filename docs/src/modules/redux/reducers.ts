import { StateType } from 'typesafe-actions';

import language from './features/language/reducer';
import navigation from './features/navigation/reducer';
import scroll from './features/scroll/reducer';
import theme from './features/theme/reducer';

export const reducers = {
  navigation,
  scroll,
  language,
  theme
};

export type RootState = StateType<typeof reducers>;

export type NavigationState = StateType<typeof navigation>;
export type ScrollState = StateType<typeof scroll>;
export type LanguageState = StateType<typeof language>;
export type ThemeState = StateType<typeof theme>;

export type StoreState = ScrollState | NavigationState | LanguageState | ThemeState;

export default reducers;
