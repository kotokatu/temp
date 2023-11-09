import {
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {
  StoreContext,
  StoreDispatchContext,
  initialState,
} from './model/context';
import { storeReducer } from './model/reducer';
import { Action, State } from './model/types';

export const useStore = (): State => useContext(StoreContext);
export const useStoreDispatch = (): Dispatch<Action> =>
  useContext(StoreDispatchContext);

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const store = useMemo(() => state, [state]);

  return (
    <StoreContext.Provider value={store}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};
