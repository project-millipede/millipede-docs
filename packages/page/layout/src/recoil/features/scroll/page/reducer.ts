import { atom } from 'recoil';

export interface State {
  scrollItems: { [key: string]: string };
}

export const initialState: State = {
  scrollItems: {}
};

export const scrollItemsState = atom({
  key: 'scroll-items',
  default: initialState
});

const addItem = (state: State, newItem: string): State => {
  return {
    ...state,
    scrollItems: {
      ...state.scrollItems,
      [newItem]: newItem
    }
  };
};

const removeItem = (state: State, itemToRemove: string): State => {
  const { [itemToRemove]: deletedItem, ...objectWithoutDeletedProp } =
    state.scrollItems;
  return {
    ...state,
    scrollItems: {
      ...objectWithoutDeletedProp
    }
  };
};

export const scrollItemsReducer = {
  addItem,
  removeItem
};
