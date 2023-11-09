import { Reducer } from 'react';
import { searchQueryLocalStorageKey } from 'shared/constants';
import { ActionType } from './enums';
import { Action, State } from './types';

export const storeReducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case ActionType.ClickedSearchSubmit: {
      localStorage.setItem(searchQueryLocalStorageKey, action.searchValue);
      return prevState;
    }
    case ActionType.ChangedSearchValueState: {
      return { ...prevState, searchValue: action.searchValue };
    }
    case ActionType.ChangedFetchedListState: {
      return { ...prevState, fetchedList: action.fetchedList };
    }
    default: {
      throw new Error('Unknown action type');
    }
  }
};
