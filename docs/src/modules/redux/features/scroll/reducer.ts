import { produce } from 'immer';

import { StoreAction } from '../actionType';
import { SCROLL_NAVIGATION_ADD, SCROLL_NAVIGATION_REMOVE } from './actionTypes';

interface Props {
  position: Set<string>;
}

export const initialState: Props = {
  position: new Set()
};

const scrollReducer = (state = initialState, action: StoreAction) =>
  produce(state, draftState => {
    switch (action.type) {
      case SCROLL_NAVIGATION_ADD:
        draftState.position.add(action.payload.newPosition);
        break;
      case SCROLL_NAVIGATION_REMOVE:
        draftState.position.delete(action.payload.newPosition);
        break;
      default:
        break;
    }
  });

export default scrollReducer;
