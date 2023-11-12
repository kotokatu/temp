import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { baseUrl } from '../API/api';
import { ThemeContext } from '../pages/SearchPage';

const Search = () => {
  const context = useContext(ThemeContext);
  const [input, setInput] = useState(context.search);

  useEffect(() => {
    const page = 1;
    context.setPage(page);
    context.setUrl(`${baseUrl}${context.search.trim()}`);
  }, [context.search]);

  return (
    <div className="search">
      <input
        className="input-search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => context.setSearch(input.trim())}>Search</button>
      <button onClick={() => context.setStatus('error')}>Error</button>
    </div>
  );
};

export default Search;
