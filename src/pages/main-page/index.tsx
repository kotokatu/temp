import { ErrorThrowingButton } from 'features/error-throwing-button';
import { Pagination } from 'features/pagination';
import { Search } from 'features/search';
import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import {
  defaultLanguage,
  pageParamName,
  pageSizeParamName,
  queryParamName,
} from 'shared/constants';
import { useLoaderDataObject } from 'shared/lib/use-loader-data-object';
import { useFetchTVShowList } from './lib/use-fetch-tv-show-list';
import styles from './main-page.module.css';
import { Skeleton } from 'features/skeleton';
import { CardList } from 'widgets/card-list';

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, page, pageSize } = useLoaderDataObject();

  if (
    typeof query !== 'string' ||
    typeof page !== 'string' ||
    typeof pageSize !== 'string'
  ) {
    throw new Error('Wrong query types');
  }

  const actualSearchParams = useMemo(
    () => ({
      [queryParamName]: query,
      [pageParamName]: page,
      [pageSizeParamName]: pageSize,
    }),
    [query, page, pageSize]
  );
  useEffect(() => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev.entries()),
      ...actualSearchParams,
    }));
  }, [actualSearchParams, searchParams, setSearchParams]);

  const fetchTVShowListParams = useMemo(
    () => ({ search: { query }, page: +page - 1, pageSize: +pageSize }),
    [query, page, pageSize]
  );
  const { count, list, isFetching } = useFetchTVShowList(
    fetchTVShowListParams,
    defaultLanguage
  );

  return (
    <>
      <main className={styles.main}>
        <ErrorThrowingButton />
        <h1 hidden={true}>TV Shows App</h1>
        <div className={styles.searchBarSection}>
          <Search />
        </div>
        <Skeleton enabled={isFetching}>
          <div className={`${styles.tvShowListSection} scrollbar`}>
            <CardList list={list}></CardList>
          </div>
          <div className={styles.paginationSection}>
            <Pagination count={count} pageSizeOptions={[5, 10, 20, 30, 50]} />
          </div>
        </Skeleton>
      </main>
      <Outlet />
    </>
  );
};
