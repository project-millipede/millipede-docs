import { MutableRefObject } from 'react';
import { ParentFiber } from 'react-reparenting';
import { atom } from 'recoil';

type ParentFiberMap = { [key: string]: MutableRefObject<ParentFiber> };

export interface ReparentState {
  parentFiberMap: ParentFiberMap;
}

const initialState: ReparentState = {
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
