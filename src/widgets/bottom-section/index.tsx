import { useStore } from 'app/store';
import { ActionType } from 'app/store/model/enums';
import { CardList } from 'features/card-list';
import { Pagination } from 'features/pagination';
import { Skeleton } from 'features/skeleton';
import { useFetchCardListData } from 'pages/main-page/lib/use-fetch-card-list-data';
import { FC, useCallback } from 'react';
import {
  defaultLanguage,
  defaultQueryValue,
  searchQueryLocalStorageKey,
} from 'shared/constants';
import styles from './bottom-section.module.css';
import { TVShowListResponse } from 'shared/api/myshows/myshows.service';

export const BottomSection: FC = () => {
  const { dispatch } = useStore();

  const page = 1;
  const pageSize = 30;

  const query =
    localStorage.getItem(searchQueryLocalStorageKey) ?? defaultQueryValue;

  const updateFetchedList = useCallback(
    (fetchedListData: TVShowListResponse) => {
      dispatch({ type: ActionType.ChangedFetchedListState, fetchedListData });
    },
    [dispatch]
  );
  const isFetching = useFetchCardListData(
    { search: { query }, page: +page - 1, pageSize: +pageSize },
    defaultLanguage,
    updateFetchedList
  );

  return (
    <Skeleton enabled={isFetching}>
      <div className={`${styles.tvShowListSection} scrollbar`}>
        <CardList />
      </div>
      <div className={styles.paginationSection}>
        <Pagination />
      </div>
    </Skeleton>
  );
};
