import { action } from 'typesafe-actions';

import { Page } from '../../../../../../src/typings/data/import';
import { CHANGE_NAVIGATION, LOAD_PAGES, SETUP_NAVIGATION } from './actionTypes';

export const setupNavigation = (pages: Array<Page>) => action(SETUP_NAVIGATION, { pages });
export const loadPages = (pathname: string) => action(LOAD_PAGES, { pathname });
export const changeNavigation = (activePage: Page) => action(CHANGE_NAVIGATION, { activePage });
