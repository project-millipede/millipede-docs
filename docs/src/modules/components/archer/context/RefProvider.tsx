import React, { createContext, Dispatch, useContext, useReducer } from 'react';

import { Action, initialState, reducer, RefsState } from './RefReducer';

const RefStateContext = createContext<RefsState>(null);
const RefDispatchContext = createContext<Dispatch<Action>>(null);

export const RefProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RefStateContext.Provider value={state}>
      <RefDispatchContext.Provider value={dispatch}>
        {children}
      </RefDispatchContext.Provider>
    </RefStateContext.Provider>
  );
};

export const useRefState = () => {
  const context = useContext(RefStateContext);
  if (context == null) {
    throw new Error('useRefState must be used within a RefProvider');
  }
  return context;
};

export const useRefDispatch = () => {
  const context = useContext(RefDispatchContext);
  if (context == null) {
    throw new Error('useRefDispatch must be used within a RefProvider');
  }
  return context;
};
