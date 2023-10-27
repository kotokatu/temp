import React, { Component } from 'react';
import { SearchBarState } from '../types';
import { StateContext } from '../contexts';

import './app.css';
import ItemList from '../item-list';
import Swapi from '../../services/swapi';
import Header from '../header';
import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';

const swapi: Swapi = new Swapi();

export const SwapiContext = React.createContext(swapi);

export default class App extends Component {
  private setSearchTerm = (newTerm: string): void => {
    this.setState(() => {
      localStorage.setItem('termForSearching', newTerm);
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
          people: response,
        };
      });
    });
  };

  public state: SearchBarState = {
    term: localStorage.getItem('termForSearching') || '',
    people: [],
    setSearchTerm: this.setSearchTerm,
    searchPerson: this.searchPerson,
  };

  render() {
    return (
      <ErrorBoundry>
        <StateContext.Provider value={this.state}>
          <SwapiContext.Provider value={swapi}>
            <div className="app">
              <Header />
              <StateContext.Consumer>
                {(state) => {
                  return <ItemList mainState={state} />;
                }}
              </StateContext.Consumer>
              <ErrorButton />
            </div>
          </SwapiContext.Provider>
        </StateContext.Provider>
      </ErrorBoundry>
    );
  }
}
