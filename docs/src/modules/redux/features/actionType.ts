import { ActionType } from 'typesafe-actions';

import * as Navigation from './navigation/actions';

// import * as Option from './option/actions';
// import * as Theme from './theme/actions';

export type NavigationActions = ActionType<typeof Navigation>;
// export type OptionActions = ActionType<typeof Option>;
// export type ThemeActions = ActionType<typeof Theme>;

export type StoreAction = NavigationActions; // | OptionActions | ThemeActions; // | Next action type
