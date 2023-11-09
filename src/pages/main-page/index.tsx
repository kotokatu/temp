import { StoreProvider } from 'app/store';
import { ErrorThrowingButton } from 'features/error-throwing-button';
import { FC } from 'react';
import { Outlet } from 'react-router';
import { useLoaderDataObject } from 'shared/lib/use-loader-data-object';
import { BottomSection } from 'widgets/bottom-section';
import { TopSection } from 'widgets/top-section';
import styles from './main-page.module.css';

/*
pagination:
  query - current page
  url - details for selected item
*/

export const MainPage: FC = () => {
  const { page, pageSize } = useLoaderDataObject();

  if (typeof page !== 'string' || typeof pageSize !== 'string') {
    throw new Error('Wrong query types');
  }

  /* const { count, list, isFetching } = useFetchCardListData(
    { search: { query }, page: +page - 1, pageSize: +pageSize },
    defaultLanguage
  ); */

  return (
    <>
      <main className={styles.main}>
        <ErrorThrowingButton />
        <h1 hidden={true}>TV Shows App</h1>
        <StoreProvider>
          <TopSection />
          <BottomSection />
        </StoreProvider>
      </main>
      <Outlet />
    </>
  );
};
