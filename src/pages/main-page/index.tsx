import { ErrorAlertButton } from 'features/error-alert-button';
import { Loader } from 'features/loader';
import { Pagination } from 'features/pagination';
import { SearchBar } from 'features/search-bar';
import { useMemo, useState } from 'react';
import { Header } from 'widgets/header';
import { TVShowDetails } from 'widgets/tv-show-details';
import { TVShowList } from 'widgets/tv-show-list';
import { useFetchTVShowDetails } from './lib/use-fetch-tv-show-details';
import { useFetchTVShowList } from './lib/use-fetch-tv-show-list';
import styles from './main-page.module.css';

const searchQueryLocalStorageKey = '[ER-23Q4]searchQuery';
const lang = 'en';

export const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem(searchQueryLocalStorageKey) ?? ''
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const fetchTVShowListParams = useMemo(
    () => ({ search: { query: searchQuery }, page: page - 1, pageSize }),
    [searchQuery, page, pageSize]
  );

  const id = 48017;
  const fetchTVShowDetailsParams = useMemo(
    () => ({ showId: id, withEpisodes: true }),
    [id]
  );

  const {
    count,
    list,
    isFetching: isFetchingList,
  } = useFetchTVShowList(fetchTVShowListParams, lang);
  const { details, isFetching: isFetchingDetails } = useFetchTVShowDetails(
    fetchTVShowDetailsParams,
    lang
  );

  const paginationProps = { pageSize, setPageSize, count, page, setPage };

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
        <div className={styles.listSection}>
          <ErrorAlertButton />
          <Loader enabled={isFetchingList}>
            <TVShowList currentList={list} />
          </Loader>
          <Loader enabled={isFetchingDetails}>
            <TVShowDetails {...details} />
          </Loader>
        </div>
        {!isFetchingList && <Pagination {...paginationProps} />}
      </main>
    </>
  );
};
