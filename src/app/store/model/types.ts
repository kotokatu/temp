import { CardProps } from 'entities/card/model/types';

export type State = { searchValue: string; fetchedList: CardProps[] };
export type Action =
  | { type: 'changedSearchValue'; searchValue: string }
  | { type: 'changedFetchedList'; fetchedList: CardProps[] };
export type Store = { state: State; dispatch: React.Dispatch<Action> };
