import { useEffect, useState } from 'react';
import { Character, EmptyProps, AppState, ResponseApi } from '../types';
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
  const [page, setPage] = useState<string>('1');
  const [lastPage, setLastPage] = useState<string>('');

  useEffect(() => {
    searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  async function searchData(): Promise<void> {
    if (loading) return;

    setLoading(true);
    localStorage.setItem('termForSearching', term);
    const response: ResponseApi | string = await api.search(term, limit, page);
    if (typeof response === 'string') {
      setMessageError(response);
    } else {
      setData(response.docs);
      setLastPage(`${response.pages}`);
      setLoading(false);
    }
  }

  const state: AppState = {
    term: term,
    data: data,
    limit: limit,
    page: `${page}`,
    lastPage: `${lastPage}`,
    loading: loading,
    messageError: messageError,
    setTerm: setTerm,
    setLimit: setLimit,
    setPage: setPage,
    searchData: searchData,
  };

  if (messageError) {
    throw new Error(messageError);
  }

  return (
    <StateContext.Provider value={state}>
      <div className="app">
        <Header />
        {lastPage}
        <Main />
        <ErrorButton />
      </div>
    </StateContext.Provider>
  );
};

export default App;
