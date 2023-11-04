import { ImagePlaceholder } from 'entities/image-placeholder';
import { ErrorAlertButton } from 'features/error-alert-button';
import { SearchBar } from 'features/search-bar';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Await, useLoaderData } from 'react-router-dom';
import { isTVShowListResponse } from 'shared/api/myshows/myshows.service';
import { isObject } from 'shared/lib/is-object';
import { TVShowList } from 'widgets/tv-show-list';
import styles from './main-page.module.css';

export const MainPage = () => {
  const loaderData = useLoaderData();

  if (!isObject(loaderData)) {
    throw new Error('MainPage loaderData is not object');
  }

  const { search, searchQueryLocalStorageKey, tvShowListData } = loaderData;

  if (typeof search !== 'string') {
    throw new Error('MainPage loaderData.search is not string');
  }

  if (typeof searchQueryLocalStorageKey !== 'string') {
    throw new Error(
      'MainPage loaderData.searchQueryLocalStorageKey is not string'
    );
  }

  const handleSearchSubmit = (query: string = '') => {
    localStorage.setItem(searchQueryLocalStorageKey, query);
  };

  return (
    <>
      <header className={`${styles.header} shadow`}>
        <h1 hidden={true}>TV Shows List</h1>
        <SearchBar
          queryName="search"
          query={search}
          onSearchSubmit={handleSearchSubmit}
        />
      </header>
      <main className={styles.main}>
        <div className={styles.listSection}>
          <ErrorAlertButton />
          <Suspense fallback={<ImagePlaceholder />}>
            <Await resolve={tvShowListData}>
              {(tvShowListData) => {
                if (!isTVShowListResponse(tvShowListData)) {
                  throw new Error('wrong TVShowListResponse type');
                }

                return (
                  <TVShowList currentList={tvShowListData.list}></TVShowList>
                );
              }}
            </Await>
          </Suspense>
          <Outlet />
        </div>
      </main>
    </>
  );
};
