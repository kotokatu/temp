import { FormEvent } from 'react';
import { Form } from 'react-router-dom';
import styles from './search-bar.module.css';
import searchIconSrc from './ui/search-icon.svg';

type SearchBarProps = {
  queryName: string;
  query: string;
  onSearchSubmit: (query?: string) => void;
};

export const SearchBar = ({
  queryName,
  query,
  onSearchSubmit,
}: SearchBarProps) => {
  const handleSubmit = ({ target }: FormEvent) => {
    if (target instanceof HTMLFormElement) {
      const formData = new FormData(target);
      onSearchSubmit(formData.get('search')?.toString());
    }
  };

  return (
    <Form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search…"
        className={styles.searchInput}
        name={queryName}
        defaultValue={query}
        autoFocus={true}
        autoComplete={'off'}
      />
      <button type="submit" className={styles.searchSubmit}>
        <img src={searchIconSrc} alt="search button" width={24} height={24} />
      </button>
    </Form>
  );
};
