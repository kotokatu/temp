import { Reducer } from 'react';
import { searchQueryLocalStorageKey } from 'shared/constants';
import { ActionType } from './enums';
import { Action, State } from './types';

export const storeReducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case ActionType.ChangedSearchValueState: {
      return { ...prevState, searchValue: action.searchValue };
    }
    case ActionType.SavedSearchValueToLocalStorage: {
      localStorage.setItem(searchQueryLocalStorageKey, action.searchValue);
      return prevState;
    }
    case ActionType.ChangedFetchedListState: {
      return { ...prevState, fetchedList: action.fetchedList };
    }
    default: {
      throw new Error(`Unknown action`);
    }
  }
};
