import { action } from 'typesafe-actions';

import { SCROLL_NAVIGATION_ADD, SCROLL_NAVIGATION_REMOVE } from './actionTypes';

export const addScrollNavigation = (newPosition: string) =>
  action(SCROLL_NAVIGATION_ADD, { newPosition });

export const removeScrollNavigation = (newPosition: string) =>
  action(SCROLL_NAVIGATION_REMOVE, { newPosition });
