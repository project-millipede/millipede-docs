import { ActionType } from 'typesafe-actions';

import * as navigation from './navigation/actions';
import * as view from './view/actions';

export const actions = {
  navigation,
  view
};

export type NavigationActions = ActionType<typeof navigation>;
export type ViewActions = ActionType<typeof view>;

export type StoreAction = NavigationActions | ViewActions;
