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
};

export const useFetchDetailedCardData: useFetchDetailedCardDataType = (
  params,
  lang
) => {
  const [details, setDetails] = useState<GetByIdResponseBody | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsFetching(true);

    fetchTVShowById(params, lang).then((details) => {
      if (!ignore) {
        setDetails(details);
        setIsFetching(false);
      }
    });

    return () => {
      ignore = true;
    };
  }, [params, lang]);

  return { details, isFetching } as const;
};
