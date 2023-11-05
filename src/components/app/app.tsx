import { useEffect, useState } from 'react';
import {
  Character,
  EmptyProps,
  AppContext,
  ResponseApi,
  Query,
} from '../types';
import { Context } from '../contexts';
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
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [limit, setLimit] = useState<string>(searchParams.get('limit') || '10');
  const [page, setPage] = useState<string>(searchParams.get('page') || '1');
  const [lastPage, setLastPage] = useState<string>('');
  const [id, setId] = useState<string>(searchParams.get('id') || '');
  const query: Query = { name: term, page: page, limit: limit, id: id };

  useEffect(() => {
    searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  useEffect(() => {
    getItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function searchData(): Promise<void> {
    if (loading) return;
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

  async function getItemData(): Promise<void> {
    if (loadingItem) return;
    setSearchParams(query);
    setLoadingItem(true);
    if (!id) {
      setItemData([]);
      setLoadingItem(false);
    } else {
      const response: ResponseApi | string = await api.getItemByID(id);
      if (typeof response === 'string') {
        setMessageError(response);
      } else {
        setItemData(response.docs);
        setLoadingItem(false);
      }
    }
  }

  const context: AppContext = {
    term: term,
    data: data,
    itemData: itemData,
    id: id,
    limit: limit,
    page: `${page}`,
    lastPage: `${lastPage}`,
    loading: loading,
    loadingItem: loadingItem,
    messageError: messageError,
    setTerm: setTerm,
    setLimit: setLimit,
    setPage: setPage,
    setId: setId,
    searchData: searchData,
  };

  if (messageError) {
    throw new Error(messageError);
  }

  return (
    <Context.Provider value={context}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </Context.Provider>
  );
};

export default App;
