import { StoreAction } from '../actionType';
import { HANDLE_DEVICE, HANDLE_DRAWER } from './actionTypes';

const initialState = {
  isDrawerExpanded: false,
  isMobile: false
};

const viewReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case HANDLE_DRAWER: {
      return {
        ...state,
        isDrawerExpanded: action.payload.isDrawerExpanded
      };
    }
    case HANDLE_DEVICE:
      return {
        ...state,
        isMobile: action.payload.isMobile
      };
    default:
      return state;
  }
};

export default viewReducer;
