import { MutableRefObject } from 'react';

import { SelectHandles } from '../types';

export const registerRef = (
  id: string,
  ref: MutableRefObject<HTMLElement>,
  dynamicRef: MutableRefObject<SelectHandles>
) => {
  return <const>{ type: 'REGISTER', id, ref, dynamicRef };
};

export const unregisterRef = (id: string) => {
  return <const>{ type: 'UNREGISTER', id };
};

export type Action = ReturnType<typeof registerRef | typeof unregisterRef>;

export interface RefsState {
  refs: {
    [key: string]: {
      ref: MutableRefObject<HTMLElement>;
      dynamicRef: MutableRefObject<SelectHandles>;
    };
  };
}

export const initialState: RefsState = {
  refs: {}
};

export const reducer = (state: RefsState, action: Action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        refs: {
          ...state.refs,
          [action.id]: {
            ref: action.ref,
            dynamicRef: action.dynamicRef
          }
        }
      };
    case 'UNREGISTER': {
      const { [action.id]: deleted, ...objectWithoutDeletedProp } = state.refs;
      return {
        ...state,
        refs: {
          ...objectWithoutDeletedProp
        }
      };
    }
    default:
      return state;
  }
};
