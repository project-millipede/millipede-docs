import { Viewport } from './types';

export const addItem = (
  state: Viewport,
  newItem: { id: string; offsetTop: number }
): Viewport => {
  return {
    ...state,
    viewportItem: {
      ...state.viewportItem,
      [newItem.id]: newItem
    }
  };
};

export const removeItem = (state: Viewport, itemToRemove: string): Viewport => {
  const { [itemToRemove]: deletedItem, ...objectWithoutDeletedProp } =
    state.viewportItem;
  return {
    ...state,
    viewportItem: {
      ...objectWithoutDeletedProp
    }
  };
};
