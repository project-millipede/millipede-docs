import { StateType } from 'typesafe-actions';

import navigation from './navigation/reducer';
import view from './view/reducer';

export type NavigationState = StateType<typeof navigation>;
export type ViewState = StateType<typeof view>;

export const reducers = {
  navigation,
  view
};

export type RootState = StateType<typeof reducers>;
