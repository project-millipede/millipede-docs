import { isEmptyString } from '@app/utils/src/string';
import { atomFamily, selectorFamily } from 'recoil';

export interface State {
  viewportItem: { [key: string]: { id: string; offsetTop: number } };
  offsetTop: number;
}

const initialState: State = {
  viewportItem: {},
  offsetTop: 0
};

const viewportItemState = atomFamily<State, string>({
  key: 'viewport-item',
  default: initialState
});

const viewportItemSelector = selectorFamily<State, string>({
  key: 'viewport-item-selector',
  get:
    timelineId =>
    ({ get }) => {
      if (isEmptyString(timelineId)) return null;
      const viewportItem = get(viewportItemState(timelineId));
      return viewportItem;
    },
  set:
    timeline =>
    ({ set }, newValue) => {
      set(viewportItemState(timeline), newValue);
    }
});

const addItem = (
  state: State,
  newItem: { id: string; offsetTop: number }
): State => {
  return {
    ...state,
    viewportItem: {
      ...state.viewportItem,
      [newItem.id]: newItem
    }
  };
};

const removeItem = (state: State, itemToRemove: string): State => {
  const { [itemToRemove]: deletedItem, ...objectWithoutDeletedProp } =
    state.viewportItem;
  return {
    ...state,
    viewportItem: {
      ...objectWithoutDeletedProp
    }
  };
};

export const states = {
  viewportItemState
};

export const reducers = {
  addItem,
  removeItem
};

export const selectors = {
  viewportItemSelector
};
