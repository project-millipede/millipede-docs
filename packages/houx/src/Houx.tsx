import React, { createContext, Dispatch, FC, useCallback, useContext, useReducer } from 'react';
import { Action, StateType } from 'typesafe-actions';

interface ContextType {
  state: StateType<any>;
  dispatch: Dispatch<Action>;
}

const Context = createContext<ContextType>({
  state: null,
  dispatch: null
});
const composeReducers = (reducers: ReducerMap) => (state, action) => {
  const combinedReducers = Object.entries(reducers).reduce(
    (acc, [namespace, reducer]) => {
      return { ...acc, [namespace]: reducer(state[namespace], action) };
    },
    {}
  );
  return combinedReducers;
};

type ReducerType = (state: any, action: any) => any;
interface ReducerMap {
  [key: string]: ReducerType;
}
interface HouxProviderProps {
  logDispatchedActions?: boolean;
  reducers: ReducerMap;
}
export const HouxProvider: FC<HouxProviderProps> = ({
  children,
  reducers,
  logDispatchedActions = false
}) => {
  const createStore = useCallback(
    (reducers: ReducerMap, logDispatchedActions: boolean) => {
      const rootReducer = composeReducers(reducers);
      const initialState = rootReducer({}, { type: 'STATE_INIT' });
      const [state, dispatch] = useReducer(rootReducer, initialState);
      const localDispatch = action => {
        // enable simple logger
        if (logDispatchedActions && action.type) {
          // eslint-disable-next-line no-console
          console.info(action);
        }
        // async actions support
        if (typeof action === 'function') {
          return action(localDispatch, state);
        }
        return dispatch(action);
      };
      return { state, dispatch: localDispatch };
    },
    [reducers]
  );

  return (
    <Context.Provider value={createStore(reducers, logDispatchedActions)}>
      {children}
    </Context.Provider>
  );
};

export const useHoux = () => useContext(Context);
