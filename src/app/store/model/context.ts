import { createContext } from 'react';
import {
  defaultQueryValue,
  searchQueryLocalStorageKey,
} from 'shared/constants';
import { State, Store } from './types';

export const initialState: State = {
  searchValue:
    localStorage.getItem(searchQueryLocalStorageKey) ?? defaultQueryValue,
  fetchedList: [],
};

export const StoreContext = createContext<Store>({
  state: initialState,
  dispatch: () => {
    throw new Error('Function not implemented.');
  },
});
