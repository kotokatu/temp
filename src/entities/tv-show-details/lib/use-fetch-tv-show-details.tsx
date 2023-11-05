import { useEffect, useState } from 'react';
import { fetchTVShowById } from 'shared/api/myshows/myshows.service';
import {
  GetByIdRequestBody,
  GetByIdResponseBody,
} from 'shared/api/myshows/types';
import { Language } from 'shared/types/Language';

export const useFetchTVShowDetails = (
  params: GetByIdRequestBody,
  lang: Language
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

  return { details, isFetching };
};
