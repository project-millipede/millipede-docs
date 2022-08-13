import { MutableRefObject } from 'react';
import { ParentFiber } from 'react-reparenting';

import { warning } from '../../utils/warning';
import { ReparentState } from './states';

export const addItem = (
  state: ReparentState,
  id: string,
  newItem: MutableRefObject<ParentFiber>
): ReparentState => {
  return {
    ...state,
    parentFiberMap: {
      ...state.parentFiberMap,
      [id]: newItem
    }
  };
};

export const removeItem = (state: ReparentState, id: string): ReparentState => {
  const { [id]: deletedItem, ...objectWithoutDeletedProp } =
    state.parentFiberMap;
  return {
    ...state,
    parentFiberMap: {
      ...objectWithoutDeletedProp
    }
  };
};

export const hasItem = (state: ReparentState, id: string): boolean => {
  const keys = Object.keys(state.parentFiberMap);
  if (keys.indexOf(id) === -1) {
    return false;
  }
  return true;
};

export const sendReparentableChild = (
  state: ReparentState,
  fromParentId: string,
  toParentId: string,
  childSelector: string | number,
  position: string | number,
  skipUpdate?: boolean
) => {
  const { parentFiberMap } = state;

  const fromParent = parentFiberMap?.[fromParentId].current;
  const toParent = parentFiberMap?.[toParentId].current;

  if (fromParent === undefined) {
    warning(`Cannot find a <Reparentable> with the id: ${fromParentId}.`);
  }
  if (toParent === undefined) {
    warning(`Cannot find a <Reparentable> with the id: ${toParentId}.`);
  }

  // Parents ids not valid.
  if (fromParent === undefined || toParent === undefined) {
    return -1;
  }

  // Send the child.
  return fromParent.sendChild(toParent, childSelector, position, skipUpdate);
};
