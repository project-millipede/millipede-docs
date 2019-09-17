import { ActionType } from 'typesafe-actions';

import * as Language from './language/actions';
import * as Navigation from './navigation/actions';
import * as Scroll from './scroll/actions';
import * as Theme from './theme/actions';

export type NavigationActions = ActionType<typeof Navigation>;
export type ScrollActions = ActionType<typeof Scroll>;
export type LanguageActions = ActionType<typeof Language>;
export type ThemeActions = ActionType<typeof Theme>;

export type StoreAction = ScrollActions | NavigationActions | LanguageActions | ThemeActions;
