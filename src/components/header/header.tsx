import { Component } from 'react';
import { SwapiContext } from '../app/app';
import SearchBar from '../search-bar';

export default class Header extends Component {
  render() {
    return (
      <div
        className="header navbar navbar-expand-lg bg-dark"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <span className="navbar-brand">Swapi People DB</span>
          <SwapiContext.Consumer>
            {(swapi) => {
              return <SearchBar swapiContext={swapi} />;
            }}
          </SwapiContext.Consumer>
        </div>
      </div>
    );
  }
}
