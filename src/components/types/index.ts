export interface SearchBarState {
  term: string;
  people: [];
  setSearchTerm: (newTerm: string) => void;
  searchPerson: () => void;
}

export interface IStateToProps {
  mainState: SearchBarState;
}
