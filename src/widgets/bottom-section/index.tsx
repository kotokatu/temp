import { useStore } from 'app/store';
import { ActionType } from 'app/store/model/enums';
import { Pagination } from 'features/pagination';
import { Skeleton } from 'features/skeleton';
import { FC, useEffect, useState } from 'react';
import { fetchTVShowList } from 'shared/api/myshows/myshows.service';
import {
  defaultLanguage,
  defaultQueryValue,
  searchQueryLocalStorageKey,
} from 'shared/constants';
import styles from './bottom-section.module.css';

export const BottomSection: FC = () => {
  const { dispatch } = useStore();
  const [isFetching, setIsFetching] = useState(false);
  const [count, setCount] = useState(0);

  const page = 1;
  const pageSize = 30;

  useEffect(() => {
    let ignore = false;
    setIsFetching(true);

    fetchTVShowList(
      {
        search: {
          query:
            localStorage.getItem(searchQueryLocalStorageKey) ??
            defaultQueryValue,
        },
        page,
        pageSize,
      },
      defaultLanguage
    ).then(({ count, list }) => {
      if (!ignore) {
        dispatch({
          type: ActionType.ChangedFetchedListState,
          fetchedList: list,
        });
        setIsFetching(false);
        setCount(count);
      }
    });
    return (): void => {
      ignore = true;
    };
  }, [dispatch]);

  return (
    <Skeleton enabled={isFetching}>
      <div className={`${styles.tvShowListSection} scrollbar`}>
        {count}
        {/* <CardList list={list}></CardList> */}
      </div>
      <div className={styles.paginationSection}>
        <Pagination count={count} pageSizeOptions={[5, 10, 20, 30, 50]} />
      </div>
    </Skeleton>
  );
};
