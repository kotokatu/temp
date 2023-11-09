import { Reducer } from 'react';
import { searchQueryLocalStorageKey } from 'shared/constants';
import { ActionType } from './enums';
import { Action, State } from './types';

export const storeReducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case ActionType.ClickedSearchSubmit: {
      localStorage.setItem(searchQueryLocalStorageKey, action.searchValue);
      return { ...prevState, searchSubmitValue: action.searchValue };
    }
    case ActionType.ChangedSearchInputValueState: {
      return { ...prevState, searchInputValue: action.searchValue };
    }
    case ActionType.ChangedFetchedListState: {
      return { ...prevState, fetchedListData: action.fetchedListData };
    }
    default: {
      throw new Error('Unknown action type');
    }
  }
};
