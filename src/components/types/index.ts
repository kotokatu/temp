export interface SearchBarState {
  term: string;
  person: string;
  setSearchTerm: (newTerm: string) => void;
  searchPerson: () => void;
}

export interface IStateToProps {
  mainState: SearchBarState;
}
