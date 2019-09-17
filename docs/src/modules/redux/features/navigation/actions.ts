import { action } from 'typesafe-actions';

import { CHANGE_NAVIGATION, CHANGE_PAGES, SETUP_NAVIGATION } from './actionTypes';
import { Page } from './type';

export const setupNavigation = (pages: Array<Page>) => action(SETUP_NAVIGATION, { pages });
export const changePages = (pathname: string) => action(CHANGE_PAGES, { pathname });
export const changeNavigation = (activePage: Page) => action(CHANGE_NAVIGATION, { activePage });
