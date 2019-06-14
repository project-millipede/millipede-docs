import { StateType } from 'typesafe-actions';

import navigation from './features/navigation/reducer';

// import option from './features/option/reducer';
// import theme from './features/theme/reducer';

export const reducers = {
  navigation
  //   option,
  //   theme
};

export type RootState = StateType<typeof reducers>;

export type NavigationState = StateType<typeof navigation>;
// export type OptionState = StateType<typeof option>;
// export type ThemeState = StateType<typeof theme>;

export type StoreState = NavigationState; // | OptionState | ThemeState; // | Next state type

export default reducers;
