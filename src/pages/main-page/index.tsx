import { ErrorAlertButton } from 'features/error-alert-button';
import styles from './main-page.module.css';
import { SearchBar } from 'features/search-bar';
import { useState } from 'react';
import { Header } from 'widgets/header';
import { TVShowList } from 'widgets/tv-show-list';
import { useFetchTVShows } from './lib/use-fetch-tv-shows';
import { Loader } from 'features/loader';

const searchQueryLocalStorageKey = '[ER-23Q4]searchQuery';

export const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem(searchQueryLocalStorageKey) ?? ''
  );

  const { currentList, isFetching } = useFetchTVShows(searchQuery);

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
        <Loader enabled={isFetching}>
          <TVShowList currentList={currentList} />
        </Loader>
      </main>
    </>
  );
};
