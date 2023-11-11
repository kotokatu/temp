import { useEffect, useState } from 'react';
import { fetchTVShowById } from 'shared/api/myshows/myshows.service';
import {
  GetByIdRequestBody,
  GetByIdResponseBody,
} from 'shared/api/myshows/types';
import { Language } from 'shared/types/language';

type useFetchDetailedCardDataType = (
  params: GetByIdRequestBody,
  lang: Language
) => {
  readonly details: GetByIdResponseBody | null;
  readonly isFetching: boolean;
  readonly error: Error | null;
};

export const useFetchDetailedCardData: useFetchDetailedCardDataType = (
  params,
  lang
) => {
  const [details, setDetails] = useState<GetByIdResponseBody | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let controller: AbortController | null = new AbortController();
    const { signal } = controller;

    setIsFetching(true);

    fetchTVShowById(params, lang, signal)
      .then((details) => {
        setDetails(details);
        setIsFetching(false);
        controller = null;
      })
      .catch((e: unknown) => {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError(e);
        }
      });

    return () => {
      controller?.abort();
      controller = null;
    };
  }, [params, lang]);

  return { details, isFetching, error } as const;
};
