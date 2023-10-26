import React, { Component } from 'react';

import './app.css';
import SearchBar from '../search-bar';
import ItemList from '../item-list';
import Swapi from '../../services/swapi';

const swapi: Swapi = new Swapi();

export const SwapiContext = React.createContext(swapi);

export default class App extends Component {
  render() {
    return (
      <SwapiContext.Provider value={swapi}>
        <div className="app">
          <SwapiContext.Consumer>
            {(swapi) => {
              return <SearchBar swapiContext={swapi} />;
            }}
          </SwapiContext.Consumer>
          <SwapiContext.Consumer>
            {(swapi) => {
              return <ItemList swapiContext={swapi} />;
            }}
          </SwapiContext.Consumer>
        </div>
      </SwapiContext.Provider>
    );
  }
}
