import { Area, Device, Szenario } from '../../../../../../src/typings/animation';
import { StoreAction } from '../actionType';
import { CHANGE_AREA, CHANGE_DEVICE, CHANGE_SZENARIO } from './actionTypes';

interface Props {
  device: Device;
  szenario: Szenario;
  area: Area;
}

export const initialState: Props = {
  device: Device.Desktop,
  szenario: Szenario.Default,
  area: Area.Local
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
