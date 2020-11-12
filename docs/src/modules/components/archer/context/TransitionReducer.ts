import { SourceToTargetType } from '../types';

export const registerTransitions = (
  id: string,
  sourceToTargets: Array<SourceToTargetType>
) => {
  return <const>{ type: 'REGISTER', id, sourceToTargets };
};

export const unregisterTransitions = (id: string) => {
  return <const>{ type: 'UNREGISTER', id };
};

export type Action = ReturnType<
  typeof registerTransitions | typeof unregisterTransitions
>;

export interface TransitionsState {
  sourceToTargetsMap: { [key: string]: Array<SourceToTargetType> };
}

export const initialState: TransitionsState = {
  sourceToTargetsMap: {}
};

export const reducer = (state: TransitionsState, action: Action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        sourceToTargetsMap: {
          ...state.sourceToTargetsMap,
          [action.id]: action.sourceToTargets
        }
      };
    case 'UNREGISTER': {
      const {
        [action.id]: deleted,
        ...objectWithoutDeletedProp
      } = state.sourceToTargetsMap;

      return {
        ...state,
        sourceToTargetsMap: {
          ...objectWithoutDeletedProp
        }
      };
    }
    default:
      return state;
  }
};
