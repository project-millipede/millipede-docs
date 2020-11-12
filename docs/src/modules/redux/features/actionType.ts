import { ActionType } from 'typesafe-actions';

import * as Animation from './animation/actions';
import * as Navigation from './navigation/actions';
import * as Scroll from './scroll/actions';
import * as Theme from './theme/actions';
import * as Timeline from './timeline/actions';
import * as View from './view/actions';

export type AnimationActions = ActionType<typeof Animation>;
export type NavigationActions = ActionType<typeof Navigation>;
export type ScrollActions = ActionType<typeof Scroll>;
export type ThemeActions = ActionType<typeof Theme>;
export type TimelineActions = ActionType<typeof Timeline>;
export type ViewActions = ActionType<typeof View>;

export type StoreAction =
  | AnimationActions
  | ScrollActions
  | NavigationActions
  | ThemeActions
  | TimelineActions
  | ViewActions;
