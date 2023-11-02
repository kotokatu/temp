import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Status from './components/Status';
import Page from './components/Page';
import List from './components/List';
import './App.css';
type Result = { name: string };

const linesPerPage = 10;
const linksToPages = 2;
const baseUrl = 'https://swapi.dev/api/people/?search=';

const App = () => {
  const [search, setSearch] = useState(localStorage.getItem('Search') ?? '');
  const [url, setUrl] = useState('');
  const [page, setPage] = useState(1);
  const [names, setNames] = useState([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const page = 1;
    setPage(page);
    setUrl(`${baseUrl}${search.trim()}&page=${page}`);
  }, [search]);

  useEffect(() => {
    setUrl(`${baseUrl}${search.trim()}&page=${page}`);
  }, [page]);

  useEffect(() => {
    if (!url) return;
    if (status === '...Loading') return;
    localStorage.setItem('Search', search);
    setStatus('...Loading');
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((response) => {
        const { count, results } = response;
        setCount(count);
        setNames(results.map(({ name }: Result) => name));
        setStatus('');
        setResult(`${count} found`);
      })
      .catch((error) =>
        setStatus(`Error: Unable perform the request ${error}`)
      );
  }, [url]);

  if (status === 'error') throw new Error('Simulated error');
  return (
    <>
      <h1>Star Wars Heroes</h1>
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
            <Page
              current={page}
              count={count}
              linesPerPage={linesPerPage}
              linksToPages={linksToPages}
              setCurrent={setPage}
            />
          </>
        )}
      </div>
    </>
  );
};
export default App;
