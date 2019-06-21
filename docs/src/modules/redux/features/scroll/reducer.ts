import { produce } from 'immer';

import { StoreAction } from '../actionType';
import { SCROLL_NAVIGATION_ADD, SCROLL_NAVIGATION_REMOVE } from './actionTypes';

interface Props {
  position: Set<string>;
}

export const initialState: Props = {
  position: new Set()
};

const scrollReducer = (draft = initialState, action: StoreAction) => {
  switch (action.type) {
    case SCROLL_NAVIGATION_ADD: {
      const newPosition = new Set(draft.position);
      newPosition.add(action.payload.newPosition);

      /* eslint-disable no-param-reassign */
      draft.position = newPosition;
      return draft;
    }
    case SCROLL_NAVIGATION_REMOVE: {
      const newPosition = new Set(draft.position);
      newPosition.delete(action.payload.newPosition);

      /* eslint-disable no-param-reassign */
      draft.position = newPosition;
      return draft;
    }
    default:
      return draft;
  }
};

export const curriedScrollReducer = produce(scrollReducer);
export default curriedScrollReducer;
