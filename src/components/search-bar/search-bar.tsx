import { Component } from 'react';

import './search-bar.css';

export default class SearchBar extends Component {
  render(): JSX.Element {
    return (
      <div className="search-bar">
        <input type="text" placeholder="search"></input>
        <button>Search</button>
      </div>
    );
  }
}
