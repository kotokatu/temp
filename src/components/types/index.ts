export interface IPerson {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
}

export interface IResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[];
}

export interface SearchBarState {
  term: string;
  people: IPerson[];
  setSearchTerm: (newTerm: string) => void;
  searchPerson: () => void;
  loading: boolean;
}

export interface IStateToProps {
  mainState: SearchBarState;
}

export type IChildren = {
  children: React.ReactNode;
};
