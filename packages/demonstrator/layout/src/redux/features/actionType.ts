import { ActionType } from 'typesafe-actions';

import * as animation from './animation/actions';

export const actions = {
  animation
};

export type AnimationActions = ActionType<typeof animation>;

export type StoreAction = AnimationActions;
