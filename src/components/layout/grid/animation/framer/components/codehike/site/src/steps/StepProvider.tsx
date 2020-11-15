import React, { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';

import { Action, initialState, reducer, StepState } from './reducer';

const StepStateContext = createContext<StepState>(null);
const StepDispatchContext = createContext<Dispatch<Action>>(null);

interface StepProviderProps {
  children: ReactNode;
}

export const StepProvider: FC<StepProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StepStateContext.Provider value={state}>
      <StepDispatchContext.Provider value={dispatch}>
        {children}
      </StepDispatchContext.Provider>
    </StepStateContext.Provider>
  );
};

export const useStepState = () => {
  const state = useContext(StepStateContext);
  if (state == null) {
    throw new Error('useStepState must be used within a StepProvider');
  }
  return state;
};

export const useStepDispatch = () => {
  const dispatch = useContext(StepDispatchContext);
  if (dispatch == null) {
    throw new Error('useStepDispatch must be used within a StepProvider');
  }
  return dispatch;
};
