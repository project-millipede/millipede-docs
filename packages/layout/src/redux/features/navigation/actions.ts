import { action } from 'typesafe-actions';

import { LOAD_PAGES } from './actionTypes';

export const loadPages = (pathname: string) => action(LOAD_PAGES, { pathname });
