import React, { useState } from 'react';

type Props = {
  input: string;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
};

const Search = (props: Props) => {
  const [input, setInput] = useState(props.input);
  return (
    <div>
      <input
        className="input-search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => props.setSearch(input.trim())}>Search</button>
      <button onClick={() => props.setStatus('error')}>Error</button>
    </div>
  );
};

export default Search;
