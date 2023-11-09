import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Status from '../components/Status';
import Page from '../components/Page';
import List from '../components/List';
import { useSearchParams, useParams, Outlet } from 'react-router-dom';

const linksToPages = 2;
const baseUrl = 'https://swapi.dev/api/people/?search=';
export interface Detail {
  name: string;
}
export interface List {
  page: number;
  count: number;
  linesPerPage: number;
  linksToPages: number;
}
export const ThemeContext = React.createContext<List>({
  page: 1,
  count: 0,
  linesPerPage: 10,
  linksToPages: linksToPages,
});
const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const { id } = params;
  const [search, setSearch] = useState(localStorage.getItem('Search') ?? '');
  const [url, setUrl] = useState('');
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 1));
  const [names, setNames] = useState<Detail[]>([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');
  const [linesPerPage, setLinesPerPages] = useState(
    Number(searchParams.get('limit') ?? 10)
  );

  useEffect(() => {
    goToPage(page);
    getList(`${baseUrl}${search}`, page, linesPerPage);
  }, []);

  useEffect(() => {
    const page = 1;
    setPage(page);
    setUrl(`${baseUrl}${search.trim()}`);
  }, [search]);

  useEffect(() => {
    setUrl(`${baseUrl}${search.trim()}&page=${page}`);
  }, [page]);

  useEffect(() => {
    setPage(Number(searchParams.get('page') ?? 1));
    setLinesPerPages(Number(searchParams.get('limit') ?? 10));
  }, [searchParams]);

  useEffect(() => {
    goToPage(page);
    if (!url) return;
    if (status === '...Loading') return;
    localStorage.setItem('Search', search);
    setStatus('...Loading');
    getList(url, page, linesPerPage);
  }, [url, page]);

  const getList = async (url: string, page: number, limit: number) => {
    const tempList: Detail[] = [];
    let count = 0;
    let totalCount = 0;
    await fetch(url)
      .then((response) => (response.ok ? response.json() : []))
      .then((result) => {
        const { count } = result;
        totalCount = count;
      })
      .catch((error) => console.error(error));
    const startIndex = (page - 1) * limit;
    const finishIndex = page * limit - 1;
    const startPage = Math.trunc(startIndex / 10) + 1;
    const finishPage = Math.min(
      Math.trunc(finishIndex / 10) + 1,
      Math.ceil(totalCount / 10)
    );
    const startOffset = (startPage * 10 - startIndex) % 10;
    const finishOffset = (finishPage * 10 - finishIndex - 1) % 10;
    const urls: string[] = [];
    for (let pageIndex = startPage; pageIndex <= finishPage; pageIndex++)
      urls.push(`${baseUrl}${search}&page=${pageIndex}`);
    await Promise.allSettled(urls.map((url) => fetch(url)))
      .then((promises) =>
        promises.map((promise) => Object(promise).value.json())
      )
      .then((promises) => Promise.allSettled(promises))
      .then((results) => {
        count = Object(results[0]).value.count ?? 0;
        return results.map((result) => Object(result).value.results);
      })
      .then((list) => {
        const resultList = list.flatMap((element) => element);
        return resultList.slice(
          startOffset,
          Math.min(
            resultList.length,
            (finishPage - startPage + 1) * 10 - finishOffset
          )
        );
      })
      // .then((flatList) => flatList.map(({ name }) => tempList.push(name)))
      .then((flatList) => flatList.map((item) => tempList.push(item)))
      .catch((error) =>
        setStatus(`Error: Unable perform the request ${error}`)
      );
    setCount(count);
    setNames(tempList);
    setStatus('');
    setResult(`${count} found`);
    setLinesPerPages(limit);
  };
  const goToPage = (page: number) => {
    setPage(page);
    searchParams.set('page', String(page));
    searchParams.set('limit', String(linesPerPage));
    setSearchParams(searchParams);
  };

  if (status === 'error') throw new Error('Simulated error');
  const current = (Number(id) - 1 ?? 0) % linesPerPage;
  return (
    <ThemeContext.Provider value={{ page, count, linesPerPage, linksToPages }}>
      <h1>Star Wars Heroes</h1>
      <section className="section-list">
        <div className="search">
          <Search input={search} setSearch={setSearch} setStatus={setStatus} />
        </div>
        <div>
          <Status status={status} linesPerPage={linesPerPage} />
          {status !== '...Loading' && (
            <>
              {result}
              <List
                current={page}
                count={count}
                items={names}
                linesPerPage={linesPerPage}
              />
              <Page />
            </>
          )}
        </div>
      </section>
      <section className="section-info">
        {status !== '...Loading' && <Outlet context={names[current]} />}
      </section>
    </ThemeContext.Provider>
  );
};
export default SearchPage;
