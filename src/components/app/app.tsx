import { useState } from 'react';
import { Character, EmptyProps, AppState } from '../types';
import { StateContext } from '../contexts';

import './app.css';
import Api from '../../services/api';
import Header from '../header';
import Main from '../main';
import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';

const api: Api = new Api();

const App: React.FC<EmptyProps> = (): JSX.Element => {
  const [term, setTerm] = useState(
    localStorage.getItem('termForSearching') || ''
  );
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  function setSearchTerm(newTerm: string): void {
    setTerm(newTerm.trim());
  }

  function searchData(limit: string): void {
    if (loading) return;

    setLoading(true);
    localStorage.setItem('termForSearching', term);

    api.search(term, limit).then((response: Character[]): void => {
      setData(response);
      setLoading(false);
    });
  }

  const state: AppState = {
    term: term,
    data: data,
    setSearchTerm: setSearchTerm,
    searchData: searchData,
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
