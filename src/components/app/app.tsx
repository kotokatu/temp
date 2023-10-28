import { Component } from 'react';
import { ITransformPerson, IProps, ISearchBarState } from '../types';
import { StateContext } from '../contexts';

import './app.css';
import Swapi from '../../services/swapi';
import Header from '../header';
import Main from '../main';
import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';

const swapi: Swapi = new Swapi();

export default class App extends Component<IProps, ISearchBarState> {
  private setSearchTerm = (newTerm: string): void => {
    this.setState((state: ISearchBarState): ISearchBarState => {
      localStorage.setItem('termForSearching', newTerm);
      return {
        ...state,
        term: newTerm,
      };
    });
  };

  private searchPerson = (): void => {
    if (this.state.loading) return;

    this.setState({ loading: true });
    const { term } = this.state;

    swapi.search(term).then((response: ITransformPerson[]): void => {
      this.setState(() => {
        return {
          people: response,
          loading: false,
        };
      });
    });
  };

  public state: ISearchBarState = {
    term: localStorage.getItem('termForSearching') || '',
    people: [],
    setSearchTerm: this.setSearchTerm,
    searchPerson: this.searchPerson,
    loading: false,
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
