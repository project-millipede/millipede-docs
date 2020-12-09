import { ActionType } from 'typesafe-actions';

import * as Theme from './theme/actions';

export type ThemeActions = ActionType<typeof Theme>;

export type StoreAction = ThemeActions;
