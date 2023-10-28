import { Component } from 'react';
import { ITransformPerson, SearchBarState } from '../types';
import { StateContext } from '../contexts';

import './app.css';
import Swapi from '../../services/swapi';
import Header from '../header';
import Main from '../main';
import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';

const swapi: Swapi = new Swapi();

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
    this.setState({ loading: true });
    const { term } = this.state;

    swapi.search(term).then((response: ITransformPerson[]) => {
      this.setState(() => {
        return {
          people: response,
          loading: false,
        };
      });
    });
  };

  public state: SearchBarState = {
    term: localStorage.getItem('termForSearching') || '',
    people: [],
    setSearchTerm: this.setSearchTerm,
    searchPerson: this.searchPerson,
    loading: true,
  };

  render() {
    return (
      <ErrorBoundry>
        <StateContext.Provider value={this.state}>
          <div className="app">
            <Header />
            <Main />
            <ErrorButton />
          </div>
        </StateContext.Provider>
      </ErrorBoundry>
    );
  }
}
