import { PaletteType } from '@material-ui/core';
import { Direction, PaletteColorOptions } from '@material-ui/core/styles';
import { Spacing } from '@material-ui/core/styles/createSpacing';

import { StoreAction } from '../actionType';
import { CHANGE_THEME } from './actionTypes';

export interface RProps {
  direction: Direction;
  spacing?: Spacing;
  dense: boolean;
  paletteColors: PaletteColorOptions;
  paletteType: PaletteType;
}

export const initialState: RProps = {
  direction: 'ltr',
  // spacing: 8,
  dense: false,
  paletteColors: {},
  paletteType: 'light'
};

const themeReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        paletteType: action.payload.paletteType || state.paletteType,
        direction: action.payload.direction || state.direction
        // paletteColors: action.payload.paletteColors || state.paletteColors
      };
    default:
      return state;
  }
};

export default themeReducer;
