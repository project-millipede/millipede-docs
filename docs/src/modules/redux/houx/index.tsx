import React, { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';
import { Action, StateType } from 'typesafe-actions';

interface ContextType {
  state: StateType<any>;
  dispatch: Dispatch<Action>;
}
const Context = createContext<ContextType>({
  state: {} as any,
  dispatch: null
});
const composeReducers = (reducers: ReducerMap) => (state, action) => {
  const combinedReducers = {};
  const schemaEntries = Object.entries(reducers);
  schemaEntries.forEach(e => {
    const [namespace, reducer] = e;
    combinedReducers[namespace] = reducer(state && state[namespace], action);
  });
  return combinedReducers;
};
const createStore = (reducers: ReducerMap, logDispatchedActions: boolean) => {
  const rootReducer = composeReducers(reducers);
  const initialState = rootReducer(undefined, { type: 'STATE_INIT' });
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
};
type ReducerType = (state: any, action: any) => any;
interface ReducerMap {
  [key: string]: ReducerType;
}
interface HouxProviderProps {
  children: ReactNode;
  logDispatchedActions?: boolean;
  reducers: ReducerMap;
}
export const HouxProvider: FC<HouxProviderProps> = ({
  children,
  reducers,
  logDispatchedActions
}) => {
  const store = createStore(reducers, logDispatchedActions);
  return <Context.Provider value={store as any}>{children}</Context.Provider>;
};
HouxProvider.defaultProps = {
  logDispatchedActions: false
};
export const useHoux = () => useContext(Context);
