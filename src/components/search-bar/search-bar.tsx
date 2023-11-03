import { MouseEvent, ChangeEvent } from 'react';
import { AppStateToProps } from '../types';

const SearchBar: React.FC<AppStateToProps> = (
  props: AppStateToProps
): JSX.Element => {
  const {
    mainState: { term, setTerm, searchData },
  } = props;

  const changeSearchTerm = (event: ChangeEvent<HTMLInputElement>): void => {
    setTerm(event.target.value.trim());
  };

  const searchTerm = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    searchData();
  };

  return (
    <form className="search-bar d-flex align-items-center">
      <input
        className="form-control me-sm-2"
        id="search-input"
        type="search"
        placeholder="search character by name"
        onChange={changeSearchTerm}
        value={term}
      ></input>
      <button
        className="btn btn-secondary my-2 my-sm-0"
        type="submit"
        onClick={searchTerm}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
