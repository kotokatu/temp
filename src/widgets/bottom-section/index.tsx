import { useSearchSubmitContext, useStoreDispatch } from 'app/store';
import { ActionType } from 'app/store/model/enums';
import { CardList } from 'features/card-list';
import { Pagination } from 'features/pagination';
import { Skeleton } from 'features/skeleton';
import { useFetchCardListData } from 'pages/main-page/lib/use-fetch-card-list-data';
import { FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TVShowListResponse } from 'shared/api/myshows/myshows.service';
import {
  defaultLanguage,
  defaultPageSizeValue,
  defaultPageValue,
  pageParamName,
  pageSizeParamName,
} from 'shared/constants';
import styles from './bottom-section.module.css';

export const BottomSection: FC = () => {
  const dispatch = useStoreDispatch();
  const searchSubmitValue = useSearchSubmitContext();
  const [searchParams] = useSearchParams();

  const page = +(searchParams.get(pageParamName) ?? defaultPageValue);
  const pageSize = +(
    searchParams.get(pageSizeParamName) ?? defaultPageSizeValue
  );

  const updateFetchedList = useCallback(
    (fetchedListData: TVShowListResponse) => {
      dispatch({ type: ActionType.ChangedFetchedListState, fetchedListData });
    },
    [dispatch]
  );
  const isFetching = useFetchCardListData(
    {
      search: { query: searchSubmitValue },
      page: page - 1,
      pageSize,
    },
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
