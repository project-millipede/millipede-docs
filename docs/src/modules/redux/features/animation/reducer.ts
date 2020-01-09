import { Area, Device, Progress, ProgressViewport, Szenario } from '../../../../../../src/typings/animation';
import { StoreAction } from '../actionType';
import {
  CHANGE_AREA,
  CHANGE_DEVICE,
  CHANGE_SZENARIO,
  SET_PROGRESS_OFFSET_Y,
  SET_PROGRESS_VIEWPORT,
  UPDATE_PROGRESS,
} from './actionTypes';

interface Props {
  device: Device;
  szenario: Szenario;
  area: Area;
  progress: Progress;
  progressOffsetY: number;
  progressViewport: ProgressViewport;
}

export const initialState: Props = {
  device: Device.Desktop,
  szenario: Szenario.Default,
  area: Area.Local,
  progress: {},
  progressOffsetY: 0,
  progressViewport: {}
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
    case UPDATE_PROGRESS:
      return {
        ...state,
        progress: action.payload.progress
      };
    case SET_PROGRESS_OFFSET_Y:
      return {
        ...state,
        progressOffsetY: action.payload.progressOffsetY
      };
    // case SET_PROGRESS_VIEWPORT:
    //   return {
    //     ...state,
    //     progressViewport: action.payload.progressViewport
    //   };
    case SET_PROGRESS_VIEWPORT:
      return {
        ...state,
        progressViewport: {
          ...state.progressViewport,
          [action.payload.index]: action.payload.progressViewport
        }
      };
    default:
      return state;
  }
};

export default animationReducer;
