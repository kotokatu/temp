import { useState } from 'react';
import { Character, EmptyProps, AppState } from '../types';
import { StateContext } from '../contexts';

import './app.css';
import Api from '../../services/api';
import Header from '../header';
import Main from '../main';
import ErrorButton from '../error-button';

const api: Api = new Api();

const App: React.FC<EmptyProps> = (): JSX.Element => {
  const [term, setTerm] = useState(
    localStorage.getItem('termForSearching') || ''
  );
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [limit, setLimit] = useState<string>('10');
  const [page] = useState<string>('1');

  function searchData(): void {
    if (loading) return;

    setLoading(true);
    localStorage.setItem('termForSearching', term);

    api
      .search(term, limit, page)
      .then((response: Character[] | string): void => {
        if (typeof response === 'string') {
          setMessageError(response);
          return;
        }
        setData(response);
        setLoading(false);
      });
  }

  const state: AppState = {
    term: term,
    data: data,
    limit: limit,
    loading: loading,
    messageError: messageError,
    setTerm: setTerm,
    setLimit: setLimit,
    searchData: searchData,
  };

  if (messageError) {
    throw new Error(messageError);
  }

  return (
    <StateContext.Provider value={state}>
      <div className="app">
        <Header />
        <Main />
        <ErrorButton />
      </div>
    </StateContext.Provider>
  );
};

export default App;
