import { Direction, PaletteMode } from '@material-ui/core';
import { action } from 'typesafe-actions';

import { CHANGE_THEME } from './actionTypes';

export const changeTheme = (theme: {
  direction?: Direction;
  paletteType: PaletteMode;
}) => action(CHANGE_THEME, theme);
