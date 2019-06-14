import { action } from 'typesafe-actions';

import { CHANGE_NAVIGATION, SETUP_NAVIGATION } from './actionTypes';
import { Page } from './type';

export const setupNavigation = (newPages: Array<Page>) => action(SETUP_NAVIGATION, { newPages });
export const changeNavigation = (newPage: Page) => action(CHANGE_NAVIGATION, { newPage });
