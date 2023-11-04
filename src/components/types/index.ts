export interface Character {
  _id: string;
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
}

export interface ResponseApi {
  docs: Character[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

type ReactSet = (value: React.SetStateAction<string>) => void;

export interface AppState {
  term: string;
  data: Character[];
  itemData: Character[];
  limit: string;
  page: string;
  lastPage: string;
  loading: boolean;
  messageError: string;
  setTerm: ReactSet;
  setLimit: ReactSet;
  setPage: ReactSet;
  searchData: () => void;
  getItemData: (id: string) => void;
}

export type ItemDetailsProps = { itemData: Character[] };

export type HasError = boolean;

export interface ErrorState {
  hasError: HasError;
}

export interface EmptyProps {}

export interface EmptyState {}

export interface AppStateToProps {
  mainState: AppState;
}

export type WithChildrenProps = {
  children: React.ReactNode;
};
