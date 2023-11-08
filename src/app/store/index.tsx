import {
  FC,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { Action, State, Store } from './model/types';

const storeReducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case 'changedSearchValue': {
      return { ...prevState, searchValue: action.searchValue };
    }
    case 'changedFetchedList': {
      return { ...prevState, fetchedList: action.fetchedList };
    }
    default: {
      throw new Error(`Unknown action`);
    }
  }
};
const initialState: State = { searchValue: '', fetchedList: [] };

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const context = useMemo<Store>(() => ({ state, dispatch }), [state]);
  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
};

const StoreContext = createContext<Store>({
  state: initialState,
  dispatch: () => {
    throw new Error('Function not implemented.');
  },
});

export const useStore = (): Store => {
  return useContext(StoreContext);
};
