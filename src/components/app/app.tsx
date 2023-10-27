import React, { Component } from 'react';
import { SearchBarState } from '../types';
import { StateContext } from '../contexts';

import './app.css';
import ItemList from '../item-list';
import Swapi from '../../services/swapi';
import Header from '../header';

const swapi: Swapi = new Swapi();

export const SwapiContext = React.createContext(swapi);

export default class App extends Component {
  private setSearchTerm = (newTerm: string): void => {
    this.setState(() => {
      return {
        term: newTerm,
      };
    });
  };

  private searchPerson = (): void => {
    const { term } = this.state;

    swapi.search(term).then((response) => {
      this.setState(() => {
        return {
          person: JSON.stringify(response),
        };
      });
    });
  };

  public state: SearchBarState = {
    term: 'r2',
    person: '',
    setSearchTerm: this.setSearchTerm,
    searchPerson: this.searchPerson,
  };

  render() {
    return (
      <StateContext.Provider value={this.state}>
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
      </StateContext.Provider>
    );
  }
}
