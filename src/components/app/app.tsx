import { useEffect, useState } from 'react';
import { Character, EmptyProps, AppState, ResponseApi } from '../types';
import { StateContext } from '../contexts';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import './app.css';
import Api from '../../services/api';
import Layout from '../router/layout';
import Main from '../main';

const api: Api = new Api();

const App: React.FC<EmptyProps> = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState(
    searchParams.get('name') || localStorage.getItem('termForSearching') || ''
  );
  const [data, setData] = useState<Character[]>([]);
  const [itemData, setItemData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [limit, setLimit] = useState<string>(searchParams.get('limit') || '10');
  const [page, setPage] = useState<string>(searchParams.get('page') || '1');
  const [lastPage, setLastPage] = useState<string>('');

  useEffect(() => {
    searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  async function searchData(): Promise<void> {
    if (loading) return;
    const query = {
      name: term,
      page: page,
      limit: limit,
    };
    setSearchParams(query);
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

  async function getItemData(id: string): Promise<void> {
    const response: ResponseApi | string = await api.getItemByID(id);
    if (typeof response === 'string') {
      setMessageError(response);
    } else {
      setItemData(response.docs);
    }
  }

  const state: AppState = {
    term: term,
    data: data,
    itemData: itemData,
    limit: limit,
    page: `${page}`,
    lastPage: `${lastPage}`,
    loading: loading,
    messageError: messageError,
    setTerm: setTerm,
    setLimit: setLimit,
    setPage: setPage,
    searchData: searchData,
    getItemData: getItemData,
  };

  if (messageError) {
    throw new Error(messageError);
  }

  return (
    <StateContext.Provider value={state}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="char" element={<p>Char</p>} />
        </Route>
      </Routes>
    </StateContext.Provider>
  );
};

export default App;
