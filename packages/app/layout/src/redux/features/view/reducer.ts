import { StoreAction } from '../actionType';
import { HANDLE_DEVICE } from './actionTypes';

export interface ViewProps {
  isMobile: boolean;
}

const initialState: ViewProps = {
  isMobile: false
};

const viewReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
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
