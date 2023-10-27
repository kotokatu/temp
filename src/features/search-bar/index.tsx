import { FormEvent } from 'react';
import styles from './index.module.css';
import searchIconSrc from './ui/search-icon.svg';

type SearchBarProps = {
  searchQuery: string;
  onSearchSubmit: (searchQuery?: string) => void;
};

export const SearchBar = ({ searchQuery, onSearchSubmit }: SearchBarProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { target } = e;
    if (target instanceof HTMLFormElement) {
      const formData = new FormData(target);
      onSearchSubmit(formData.get('search')?.toString());
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search…"
        className={styles.searchInput}
        name="search"
        defaultValue={searchQuery}
        autoFocus={true}
        autoComplete={'off'}
      />
      <button type="submit" className={styles.searchSubmit}>
        <img src={searchIconSrc} alt="search button" width={24} height={24} />
      </button>
    </form>
  );
};
