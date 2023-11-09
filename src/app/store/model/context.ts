import { createContext } from 'react';
import {
  defaultQueryValue,
  searchQueryLocalStorageKey,
} from 'shared/constants';
import { State, Store } from './types';

const initialSearchValue =
  localStorage.getItem(searchQueryLocalStorageKey) ?? defaultQueryValue;

export const initialState: State = {
  searchInputValue: initialSearchValue,
  searchSubmitValue: initialSearchValue,
  fetchedListData: { count: 0, list: [] },
};

export const StoreContext = createContext<Store>({
  state: initialState,
  dispatch: () => {
    throw new Error('Function not implemented.');
  },
});
