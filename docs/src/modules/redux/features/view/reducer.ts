import { StoreAction } from '../actionType';
import { HANDLE_DRAWER } from './actionTypes';

const initialState = {
  isOpen: false
};

const viewReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case HANDLE_DRAWER:
      return {
        ...state,
        isOpen: action.payload.isOpen
      };
    default:
      return state;
  }
};

export default viewReducer;
