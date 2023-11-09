import {
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { StoreContext, initialState } from './model/context';
import { storeReducer } from './model/reducer';
import { Store } from './model/types';

export const useStore = (): Store => {
  return useContext(StoreContext);
};

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const { fetchedList, searchValue } = state;

  const memoDispatch = useCallback(dispatch, [dispatch]);
  const memoFetchedList = useMemo(() => fetchedList, [fetchedList]);
  const store = useMemo(
    () => ({
      state: { fetchedList: memoFetchedList, searchValue },
      dispatch: memoDispatch,
    }),
    [memoDispatch, memoFetchedList, searchValue]
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
