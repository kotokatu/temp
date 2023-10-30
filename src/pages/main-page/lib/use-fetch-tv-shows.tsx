import { useEffect, useState } from 'react';
import { fetchTVShows } from 'shared/api/myshows/myshows.service';
import { ApiShowSummary } from 'shared/api/myshows/types';

export const useFetchTVShows = (query: string) => {
  const [currentList, setCurrentList] = useState<ApiShowSummary[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsFetching(true);

    fetchTVShows(0, { query }).then((data) => {
      if (!ignore) {
        setCurrentList(data.result);
        setIsFetching(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query]);

  return { currentList, isFetching };
};
