import { ActionType } from 'typesafe-actions';

import * as Animation from './animation/actions';
import * as Theme from './theme/actions';
import * as Timeline from './timeline/actions';

export type AnimationActions = ActionType<typeof Animation>;
export type ThemeActions = ActionType<typeof Theme>;
export type TimelineActions = ActionType<typeof Timeline>;

export type StoreAction = AnimationActions | ThemeActions | TimelineActions;
