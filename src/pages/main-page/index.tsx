import { ErrorThrowingButton } from 'features/error-throwing-button';
import { Pagination } from 'features/pagination';
import { Search } from 'features/search';
import { Skeleton } from 'features/skeleton';
import { FC, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import {
  defaultLanguage,
  pageParamName,
  pageSizeParamName,
  queryParamName,
} from 'shared/constants';
import { useLoaderDataObject } from 'shared/lib/use-loader-data-object';
import { CardList } from 'widgets/card-list';
import { useFetchCardListData } from './lib/use-fetch-card-list-data';
import styles from './main-page.module.css';

export const MainPage: FC = () => {
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
  const { count, list, isFetching } = useFetchCardListData(
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
