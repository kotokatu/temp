import { MouseEvent, ChangeEvent, Component } from 'react';

import './search-bar.css';
import Swapi from '../../services/swapi';

interface SearchBarState {
  term: string;
  person: string;
}

interface IMyComponentProps {
  swapiContext: Swapi;
}

export default class SearchBar extends Component<IMyComponentProps> {
  public state: SearchBarState = {
    term: '',
    person: '',
  };

  private changeSearchTerm = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState(() => {
      return {
        term: event.target.value,
      };
    });
  };

  private searchTerm = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    this.props.swapiContext.search(this.state.term).then((response) => {
      this.setState(() => {
        return {
          person: JSON.stringify(response),
        };
      });
    });
  };

  render(): JSX.Element {
    const { term, person } = this.state;

    return (
      <form className="search-bar">
        <label>https://swapi.dev/api/people/</label>
        <input
          type="text"
          placeholder="search by name"
          onChange={this.changeSearchTerm}
          value={term}
        ></input>
        <button onClick={this.searchTerm}>Search</button>
        <p>{term}</p>
        <p>{person}</p>
      </form>
    );
  }
}
