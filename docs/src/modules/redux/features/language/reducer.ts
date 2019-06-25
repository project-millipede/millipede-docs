import { StoreAction } from '../actionType';
import { CHANGE_USER_LANGUAGE } from './actionTypes';

interface Props {
  userLanguage: string;
}

export const initialState: Props = {
  userLanguage: ''
};

const languageReducer = (state = initialState, action: StoreAction) => {
  switch (action.type) {
    case CHANGE_USER_LANGUAGE:
      return {
        ...state,
        userLanguage: action.payload.newUserLanguage
      };
    default:
      return state;
  }
};

export default languageReducer;
