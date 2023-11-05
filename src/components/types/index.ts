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

export interface AppContext {
  term: string;
  data: Character[];
  itemData: Character[];
  id: string;
  limit: string;
  page: string;
  lastPage: string;
  loading: boolean;
  messageError: string;
  setTerm: ReactSet;
  setLimit: ReactSet;
  setPage: ReactSet;
  setId: ReactSet;
  searchData: () => void;
}

export type ItemDetailsProps = { setId: ReactSet; itemData: Character[] };

export type HasError = boolean;

export interface ErrorState {
  hasError: HasError;
}

export interface EmptyProps {}

export interface EmptyState {}

export interface AppContextToProps {
  context: AppContext;
}

export type WithChildrenProps = {
  children: React.ReactNode;
};
