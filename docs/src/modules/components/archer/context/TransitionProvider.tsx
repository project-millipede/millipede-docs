import React, { createContext, Dispatch, useContext, useReducer } from 'react';

import { Action, initialState, reducer, TransitionsState } from './TransitionReducer';

const TransitionStateContext = createContext<TransitionsState>(null);
const TransitionDispatchContext = createContext<Dispatch<Action>>(null);

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
  const context = useContext(TransitionStateContext);
  if (context == null) {
    throw new Error(
      'useTransitionState must be used within a TransitionProvider'
    );
  }
  return context;
};

export const useTransitionDispatch = () => {
  const context = useContext(TransitionDispatchContext);
  if (context == null) {
    throw new Error(
      'useTransitionDispatch must be used within a TransitionProvider'
    );
  }
  return context;
};
