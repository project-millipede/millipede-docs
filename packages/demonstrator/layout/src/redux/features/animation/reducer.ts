import { Area, Device, Szenario } from '@demonstrator/types';

import { StoreAction } from '../actionType';
import { CHANGE_AREA, CHANGE_DEVICE, CHANGE_SZENARIO } from './actionTypes';

export interface AnimationProps {
  device: Device;
  szenario: Szenario;
  area: Area;
}

export const initialState: AnimationProps = {
  device: Device.Desktop,
  szenario: Szenario.Default,
  area: Area.Local
};

const animationReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case CHANGE_DEVICE:
      return {
        ...state,
        device: action.payload.device
      };
    case CHANGE_SZENARIO:
      return {
        ...state,
        szenario: action.payload.szenario
      };
    case CHANGE_AREA:
      return {
        ...state,
        area: action.payload.area
      };
    default:
      return state;
  }
};

export default animationReducer;
