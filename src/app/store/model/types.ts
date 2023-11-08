import { CardProps } from 'entities/card/model/types';
import { ActionType } from './enums';

export type State = { searchValue: string; fetchedList: CardProps[] };
export type Store = { state: State; dispatch: React.Dispatch<Action> };
export type Action =
  | { type: ActionType.ChangedSearchValueState; searchValue: string }
  | { type: ActionType.ChangedFetchedListState; fetchedList: CardProps[] }
  | { type: ActionType.SavedSearchValueToLocalStorage; searchValue: string };
