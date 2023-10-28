export interface IPerson {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  url: string;
}

export interface ITransformPerson {
  id: string;
  name: string;
  birthYear: string;
  gender: string;
  eyeColor: string;
  img: string;
}

export interface IResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[];
}

export interface ISearchBarState {
  term: string;
  people: ITransformPerson[];
  setSearchTerm: (newTerm: string) => void;
  searchPerson: () => void;
  loading: boolean;
}
export interface IErrorState {
  hasError: boolean;
}

export type IProps = object;

export interface IStateToProps {
  mainState: ISearchBarState;
}

export type IChildren = {
  children: React.ReactNode;
};
