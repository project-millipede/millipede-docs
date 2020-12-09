import { ActionType } from 'typesafe-actions';

import * as Theme from './theme/actions';
import * as Timeline from './timeline/actions';

export type ThemeActions = ActionType<typeof Theme>;
export type TimelineActions = ActionType<typeof Timeline>;

export type StoreAction = ThemeActions | TimelineActions;
