import { ImagePlaceholder } from 'entities/image-placeholder';
import { ErrorAlertButton } from 'features/error-alert-button';
import { Pagination } from 'features/pagination';
import { SearchBar } from 'features/search-bar';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Await, useNavigation } from 'react-router-dom';
import { isTVShowListResponse } from 'shared/api/myshows/myshows.service';
import { useLoaderDataObject } from 'shared/lib/use-loader-data-object';
import { TVShowList } from 'widgets/tv-show-list';
import styles from './main-page.module.css';

export const MainPage = () => {
  const { tvShowListData } = useLoaderDataObject();
  const navigation = useNavigation();

  return (
    <>
      <main className={styles.main}>
        <ErrorAlertButton />
        <h1 hidden={true}>TV Shows App</h1>
        <div className={styles.searchBarSection}>
          <SearchBar />
        </div>
        <Suspense fallback={<ImagePlaceholder />}>
          <Await resolve={tvShowListData}>
            {(tvShowListData) => {
              if (!isTVShowListResponse(tvShowListData)) {
                throw new Error('tvShowListData has wrong type');
              }
              if (navigation.state === 'loading') {
                return <ImagePlaceholder />;
              }
              return (
                <>
                  <div className={`${styles.tvShowListSection} scrollbar`}>
                    <TVShowList currentList={tvShowListData.list}></TVShowList>
                  </div>
                  <div className={styles.paginationSection}>
                    <Pagination
                      count={tvShowListData.count}
                      pageSizeOptions={[5, 10, 20, 30, 50]}
                    />
                  </div>
                </>
              );
            }}
          </Await>
        </Suspense>
      </main>
      <Outlet />
    </>
  );
};
