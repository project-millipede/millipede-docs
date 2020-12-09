import { ActionType } from 'typesafe-actions';

import * as timeline from './timeline/actions';

export const actions = {
  timeline
};

export type TimelineActions = ActionType<typeof timeline>;

export type StoreAction = TimelineActions;
