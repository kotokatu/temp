import { createContext } from 'react';
import { State, Store } from './types';

export const initialState: State = { searchValue: '', fetchedList: [] };

export const StoreContext = createContext<Store>({
  state: initialState,
  dispatch: () => {
    throw new Error('Function not implemented.');
  },
});
