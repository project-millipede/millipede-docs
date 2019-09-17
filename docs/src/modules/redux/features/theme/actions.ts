import { PaletteType } from '@material-ui/core';
import { Direction } from '@material-ui/core/styles';
import { action } from 'typesafe-actions';

import { CHANGE_THEME } from './actionTypes';

export const changeTheme = (theme: { direction?: Direction; paletteType?: PaletteType }) =>
  action(CHANGE_THEME, theme);
