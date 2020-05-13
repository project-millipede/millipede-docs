import { RefObject } from 'react';

export const registerRef = (id: string, ref: RefObject<HTMLElement>) => {
  return <const>{ type: 'REGISTER', id, ref };
};

export const unregisterRef = (id: string) => {
  return <const>{ type: 'UNREGISTER', id };
};

export type Action = ReturnType<typeof registerRef | typeof unregisterRef>;

export interface State {
  refs: { [key: string]: RefObject<HTMLElement> };
}

export const initialState: State = {
  refs: {}
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        refs: {
          ...state.refs,
          [action.id]: action.ref
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
