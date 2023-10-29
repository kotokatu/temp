import { ErrorAlertButton } from 'features/error-alert-button';
import styles from './index.module.css';
import { SearchBar } from 'features/search-bar';
import { useState } from 'react';
import { Header } from 'widgets/header';
import { TVShowList } from 'widgets/tv-show-list';

const searchQueryLocalStorageKey = '[ER-23Q4]searchQuery';

export const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem(searchQueryLocalStorageKey) ?? ''
  );

  const handleSearchSubmit = (query = '') => {
    setSearchQuery(query);
    localStorage.setItem(searchQueryLocalStorageKey, query);
  };

  return (
    <>
      <Header>
        <SearchBar
          searchQuery={searchQuery}
          onSearchSubmit={handleSearchSubmit}
        />
      </Header>
      <main className={styles.main}>
        <ErrorAlertButton />
        <TVShowList searchQuery={searchQuery} />
      </main>
    </>
  );
};
