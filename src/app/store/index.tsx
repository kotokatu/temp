import { FC, ReactNode, useContext, useMemo, useReducer } from 'react';
import { StoreContext, initialState } from './model/context';
import { storeReducer } from './model/reducer';
import { Store } from './model/types';

export const useStore = (): Store => {
  return useContext(StoreContext);
};

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const store = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
