import { StateType } from 'typesafe-actions';

import view from './view/reducer';

export type ViewState = StateType<typeof view>;

export const reducers = {
  view
};

export type RootState = StateType<typeof reducers>;
