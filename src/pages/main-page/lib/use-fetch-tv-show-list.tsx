import { useEffect, useState } from 'react';
import { fetchTVShowList } from 'shared/api/myshows/myshows.service';
import { ApiShowSummary, GetRequestBody } from 'shared/api/myshows/types';
import { Language } from 'shared/types/Language';

export const useFetchTVShowList = (params: GetRequestBody, lang: Language) => {
  const [count, setCount] = useState(0);
  const [list, setList] = useState<ApiShowSummary[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsFetching(true);

    fetchTVShowList(params, lang).then(({ count, list }) => {
      if (!ignore) {
        setCount(count);
        setList(list);
        setIsFetching(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [params, lang]);

  return { count, list, isFetching };
};
