import { action } from 'typesafe-actions';

import { CHANGE_USER_LANGUAGE } from './actionTypes';

export const changeUserLanguage = (newUserLanguage: string) =>
  action(CHANGE_USER_LANGUAGE, { newUserLanguage });
