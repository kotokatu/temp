import { ActionType } from './enums';
import { TVShowListResponse } from 'shared/api/myshows/myshows.service';

export type Store = { state: State; dispatch: React.Dispatch<Action> };

export type State = {
  searchInputValue: string;
  searchSubmitValue: string;
  fetchedListData: TVShowListResponse;
};

export type Action =
  | { type: ActionType.ChangedSearchInputValueState; searchValue: string }
  | {
      type: ActionType.ChangedFetchedListState;
      fetchedListData: TVShowListResponse;
    }
  | { type: ActionType.ClickedSearchSubmit; searchValue: string };
