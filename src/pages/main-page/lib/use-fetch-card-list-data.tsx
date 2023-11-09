import { useEffect, useState } from 'react';
import { fetchTVShowList } from 'shared/api/myshows/myshows.service';
import { ApiShowSummary, GetRequestBody } from 'shared/api/myshows/types';
import { Language } from 'shared/types/language';

type UseFetchCardListDataType = (
  params: GetRequestBody,
  lang: Language
) => {
  readonly count: number;
  readonly list: ApiShowSummary[];
  readonly isFetching: boolean;
};

export const useFetchCardListData: UseFetchCardListDataType = (
  { search: { query }, page, pageSize },
  lang
) => {
  const [count, setCount] = useState(0);
  const [list, setList] = useState<ApiShowSummary[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsFetching(true);

    fetchTVShowList({ search: { query }, page, pageSize }, lang).then(
      ({ count, list }) => {
        if (!ignore) {
          setCount(count);
          setList(list);
          setIsFetching(false);
        }
      }
    );
    return (): void => {
      ignore = true;
    };
  }, [lang, page, pageSize, query]);

  return { count, list, isFetching } as const;
};
