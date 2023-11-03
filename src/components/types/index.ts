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

export interface AppState {
  term: string;
  data: Character[];
  limit: string;
  loading: boolean;
  setSearchTerm: (newTerm: string) => void;
  setLimitItem: (limit: string) => void;
  searchData: () => void;
}

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
