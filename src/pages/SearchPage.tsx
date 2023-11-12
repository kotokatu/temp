import { useState, useEffect, createContext } from 'react';
import DetailSection from '../components/DetailSection';
import MainSection from '../components/MainSection';
import { useSearchParams } from 'react-router-dom';
import {
  baseUrl,
  Detail,
  Context,
  getTotalCount,
  getItemsList,
} from '../API/api';

const linksToPages = 2;
export const ThemeContext = createContext<Context>({
  page: 1,
  count: 0,
  linesPerPage: 10,
  linksToPages: 2,
  items: [],
  status: '',
  search: '',
  url: '',
  setStatus: () => null,
  setSearch: () => null,
  setCount: () => null,
  setPage: () => null,
  setItems: () => null,
  setLinesPerPage: () => null,
  setUrl: () => null,
});
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(localStorage.getItem('Search') ?? '');
  const [url, setUrl] = useState(`${baseUrl}${search.trim()}`);
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 1));
  const [items, setItems] = useState<Detail[]>([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('');
  const [linesPerPage, setLinesPerPage] = useState(
    Number(searchParams.get('limit') ?? 10)
  );

  const getValue = () => {
    return {
      url,
      page,
      count,
      linesPerPage,
      linksToPages,
      items,
      status,
      search,
      setStatus,
      setSearch,
      setPage,
      setCount,
      setItems,
      setLinesPerPage,
      setUrl,
    };
  };

  const getList = async (url: string, page: number, limit: number) => {
    const context = getValue();
    if (!context.url || context.status === '...Loading') return;
    context.setStatus('...Loading');
    const totalCount = await getTotalCount(url);
    const { items, count, errorStatus } = await getItemsList({
      page,
      limit,
      search,
      totalCount,
    });

    context.setCount(count);
    context.setItems(items);
    context.setStatus(errorStatus ? errorStatus : '');
    context.setLinesPerPage(limit);
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') getList(url, page, linesPerPage);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') getList(url, page, linesPerPage);
  }, [url]);

  useEffect(() => {
    setPage(Number(searchParams.get('page') ?? 1));
    setLinesPerPage(Number(searchParams.get('limit') ?? 10));
    setUrl(`${baseUrl}${search.trim()}&page=${page}&limit=${linesPerPage}`);
  }, [searchParams]);

  if (status === 'error') throw new Error('Simulated error');

  return (
    <ThemeContext.Provider value={getValue()}>
      <h1>Star Wars Heroes</h1>
      <MainSection />
      <DetailSection />
    </ThemeContext.Provider>
  );
};
export default SearchPage;
