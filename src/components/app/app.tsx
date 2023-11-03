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
  const [limit, setLimit] = useState<string>('10');
  const [page] = useState<string>('1');

  function setSearchTerm(newTerm: string): void {
    setTerm(newTerm.trim());
  }

  function setLimitItem(limit: string): void {
    setLimit(limit);
  }

  function searchData(): void {
    if (loading) return;

    setLoading(true);
    localStorage.setItem('termForSearching', term);

    api.search(term, limit, page).then((response: Character[]): void => {
      setData(response);
      setLoading(false);
    });
  }

  const state: AppState = {
    term: term,
    data: data,
    limit: limit,
    loading: loading,
    setSearchTerm: setSearchTerm,
    searchData: searchData,
    setLimitItem: setLimitItem,
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
