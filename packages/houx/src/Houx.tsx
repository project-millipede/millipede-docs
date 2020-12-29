import { CollectionUtil } from '@app/utils';
import { createContext, Dispatch, FC, useContext, useReducer } from 'react';
import { Action, StateType } from 'typesafe-actions';

interface ContextType {
  state: StateType<any>;
  dispatch: Dispatch<Action>;
  addReducer: (reducer: any) => void;
  removeReducer: (name: string) => void;
}

type ReducerType = (state: any, action: any) => any;

interface ReducerMap {
  [key: string]: ReducerType;
}

const StoreContext = createContext<ContextType>({
  state: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addReducer: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeReducer: () => {}
});

const [addReducer, combinedReducer, removeReducer] = (() => {
  let reducers: ReducerMap = {};

  const addReducer = reducer => {
    reducers = { ...reducers, ...reducer };
  };

  const removeReducer = (name: string) => {
    reducers = CollectionUtil.Object.removePropertyFromObject(reducers, name);
  };

  const combinedReducer = (initialState = {}, action = {}) => {
    return Object.entries(reducers).reduce((state, [name, reducer]) => {
      const resultingState = {
        ...state,
        [name]: reducer(state[name], action) as any
      };
      return resultingState;
    }, initialState);
  };
  return [addReducer, combinedReducer, removeReducer];
})();

export interface HouxProviderProps {
  initialReducers?: any;
}

export const HouxProvider: FC<HouxProviderProps> = ({
  children,
  initialReducers = {}
}) => {
  Object.entries(initialReducers).forEach(([name, reducer]) => {
    addReducer({ [name]: reducer });
  });

  const [state, dispatch] = useReducer(
    combinedReducer,
    combinedReducer({}, {})
  );

  return (
    <StoreContext.Provider
      value={{ state, dispatch, addReducer, removeReducer }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useHoux = () => {
  return useContext(StoreContext);
};
