import {
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { TVShowListResponse } from 'shared/api/myshows/myshows.service';
import {
  FetchedListDataContext,
  SearchInputContext,
  SearchSubmitContext,
  StoreDispatchContext,
  initialState,
} from './model/context';
import { storeReducer } from './model/reducer';
import { Action } from './model/types.type';

export function useSearchInputContext(): string {
  return useContext(SearchInputContext);
}
export function useSearchSubmitContext(): string {
  return useContext(SearchSubmitContext);
}
export function useFetchedListDataContext(): TVShowListResponse {
  return useContext(FetchedListDataContext);
}
export function useStoreDispatch(): Dispatch<Action> {
  return useContext(StoreDispatchContext);
}

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const { fetchedListData, searchInputValue, searchSubmitValue } = state;

  const memoFetchedListData = useMemo(() => fetchedListData, [fetchedListData]);

  return (
    <SearchInputContext.Provider value={searchInputValue}>
      <SearchSubmitContext.Provider value={searchSubmitValue}>
        <FetchedListDataContext.Provider value={memoFetchedListData}>
          <StoreDispatchContext.Provider value={dispatch}>
            {children}
          </StoreDispatchContext.Provider>
        </FetchedListDataContext.Provider>
      </SearchSubmitContext.Provider>
    </SearchInputContext.Provider>
  );
};
