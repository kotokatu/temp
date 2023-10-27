import React, { Component } from 'react';

import './app.css';
import ItemList from '../item-list';
import Swapi from '../../services/swapi';
import Header from '../header';

const swapi: Swapi = new Swapi();

export const SwapiContext = React.createContext(swapi);

export default class App extends Component {
  render() {
    return (
      <SwapiContext.Provider value={swapi}>
        <div className="app">
          <Header />
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
