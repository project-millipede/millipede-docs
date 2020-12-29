import { ActionType } from 'typesafe-actions';

import * as view from './view/actions';

export const actions = {
  view
};

export type ViewActions = ActionType<typeof view>;

export type StoreAction = ViewActions;
