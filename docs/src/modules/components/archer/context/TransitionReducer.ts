import { SourceToTargetType } from '../types';

export const registerTransitions = (
  elementId: string,
  sourceToTargets: Array<SourceToTargetType>
) => {
  return <const>{ type: 'REGISTER', elementId, sourceToTargets };
};

export const unregisterTransitions = (elementId: string) => {
  return <const>{ type: 'UNREGISTER', elementId };
};

export type Action = ReturnType<
  typeof registerTransitions | typeof unregisterTransitions
>;

export interface State {
  sourceToTargetsMap: { [key: string]: Array<SourceToTargetType> };
}

export const initialState = {
  sourceToTargetsMap: {}
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        sourceToTargetsMap: {
          ...state.sourceToTargetsMap,
          [action.elementId]: action.sourceToTargets
        }
      };
    case 'UNREGISTER': {
      const {
        [action.elementId]: deleted,
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
