import { useEffect, useState } from 'react';
import {
  TVShowListResponse,
  fetchTVShowList,
} from 'shared/api/myshows/myshows.service';
import { GetRequestBody } from 'shared/api/myshows/types';
import { Language } from 'shared/types/language';

type UseFetchCardListDataType = (
  params: GetRequestBody,
  lang: Language,
  resolve: (list: TVShowListResponse) => void
) => boolean;
export const useFetchCardListData: UseFetchCardListDataType = (
  { search: { query }, page, pageSize },
  lang,
  resolve
) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let controller: AbortController | null = new AbortController();
    const { signal } = controller;

    setIsFetching(true);

    fetchTVShowList({ search: { query }, page, pageSize }, lang, signal)
      .then((response) => {
        resolve(response);
        setIsFetching(false);
        controller = null;
      })
      .catch((e: unknown) => {
        if (e instanceof Error && e.name !== 'AbortError') {
          throw e;
        }
      });

    return () => {
      controller?.abort();
      controller = null;
    };
  }, [lang, page, pageSize, query, resolve]);

  return isFetching;
};
