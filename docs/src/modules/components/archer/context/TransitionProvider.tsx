import React, { createContext, Dispatch, useContext, useReducer } from 'react';

import { Action, initialState, reducer, State } from './TransitionReducer';

const TransitionStateContext = createContext(null);
const TransitionDispatchContext = createContext(null);

export const TransitionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TransitionStateContext.Provider value={state}>
      <TransitionDispatchContext.Provider value={dispatch}>
        {children}
      </TransitionDispatchContext.Provider>
    </TransitionStateContext.Provider>
  );
};

export const useTransitionState = () => {
  const context = useContext<State>(TransitionStateContext);
  if (context == null) {
    throw new Error(
      'useTransitionState must be used within a TransitionProvider'
    );
  }
  return context;
};

export const useTransitionDispatch = () => {
  const context = useContext<Dispatch<Action>>(TransitionDispatchContext);
  if (context == null) {
    throw new Error(
      'useTransitionDispatch must be used within a TransitionProvider'
    );
  }
  return context;
};
