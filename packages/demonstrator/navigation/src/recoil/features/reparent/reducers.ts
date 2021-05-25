import get from 'lodash/get';
import { MutableRefObject } from 'react';
import { ParentFiber } from 'react-reparenting';
import { atom } from 'recoil';

import { warning } from '../../../utils/warning';

type ParentFiberMap = { [key: string]: MutableRefObject<ParentFiber> };

export interface ReparentState {
  parentFiberMap: ParentFiberMap;
}

export const initialState: ReparentState = {
  parentFiberMap: {}
};

// Note:
// The reparent atom uses the flag dangerouslyAllowMutability, to persist mutable ref-objects.
// Under ordinary circumstances, recoil allows only read-only values to persist.
// An option is to use a Jotai atom when recoil deprecates the support for mutability.
export const reparentState = atom({
  key: 'reparent',
  default: initialState,
  dangerouslyAllowMutability: true
});

const addItem = (
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

const removeItem = (state: ReparentState, id: string): ReparentState => {
  const { [id]: deletedItem, ...objectWithoutDeletedProp } =
    state.parentFiberMap;
  return {
    ...state,
    parentFiberMap: {
      ...objectWithoutDeletedProp
    }
  };
};

const hasItem = (state: ReparentState, id: string): boolean => {
  const keys = Object.keys(state.parentFiberMap);
  if (keys.indexOf(id) === -1) {
    return false;
  }
  return true;
};

const sendReparentableChild = (
  state: ReparentState,
  fromParentId: string,
  toParentId: string,
  childSelector: string | number,
  position: string | number,
  skipUpdate?: boolean
): number => {
  const { parentFiberMap } = state;

  const { current: fromParent } = get(parentFiberMap, fromParentId);
  const { current: toParent } = get(parentFiberMap, toParentId);

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

export const reparentReducer = {
  addItem,
  removeItem,
  hasItem,
  sendReparentableChild
};
