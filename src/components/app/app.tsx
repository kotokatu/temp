import { useState } from 'react';
import { TransformPerson, EmptyProps, AppState } from '../types';
import { StateContext } from '../contexts';

import './app.css';
import Swapi from '../../services/swapi';
import Header from '../header';
import Main from '../main';
import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';

const swapi: Swapi = new Swapi();

const App: React.FC<EmptyProps> = (): JSX.Element => {
  const [term, setTerm] = useState(
    localStorage.getItem('termForSearching') || ''
  );
  const [people, setPeople] = useState<TransformPerson[]>([]);
  const [loading, setLoading] = useState(false);

  function setSearchTerm(newTerm: string): void {
    setTerm(newTerm.trim());
  }

  function searchPerson(): void {
    if (loading) return;

    setLoading(true);
    localStorage.setItem('termForSearching', term);

    swapi.search(term).then((response: TransformPerson[]): void => {
      setPeople(response);
      setLoading(false);
    });
  }

  const state: AppState = {
    term: term,
    people: people,
    setSearchTerm: setSearchTerm,
    searchPerson: searchPerson,
    loading: loading,
  };

  return (
    <ErrorBoundry>
      <StateContext.Provider value={state}>
        <div className="app">
          <Header />
          <Main />
          <ErrorButton />
        </div>
      </StateContext.Provider>
    </ErrorBoundry>
  );
};

export default App;
