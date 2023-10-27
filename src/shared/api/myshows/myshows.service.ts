import {
  GetByIdRequest,
  GetByIdResponse,
  GetRequest,
  GetRequestBodySearch,
  GetResponse,
} from './types';

type Language = 'en' | 'ru';

const baseUrl = 'https://api.myshows.me/v2/rpc/';
const defaultPage = 0;
const defaultPageSize = 30;
const defaultLang: Language = 'en';

const fetchJson = async <TRequest, TResponse>(
  body: TRequest,
  lang = defaultLang
): Promise<TResponse> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': lang,
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();

  return json;
};

export const fetchTVShows = async (
  page = defaultPage,
  searchParams?: GetRequestBodySearch
): Promise<GetResponse> => {
  const body: GetRequest = {
    jsonrpc: '2.0',
    method: 'shows.Get',
    params: {
      search: { ...searchParams },
      page,
      pageSize: defaultPageSize,
    },
    id: 1,
  };

  const json = await fetchJson<GetRequest, GetResponse>(body);

  return json;
};

export const fetchTVShowById = async (id: number): Promise<GetByIdResponse> => {
  const body: GetByIdRequest = {
    jsonrpc: '2.0',
    method: 'shows.GetById',
    params: { showId: id, withEpisodes: false },
    id: 1,
  };

  const json = await fetchJson<GetByIdRequest, GetByIdResponse>(body);

  return json;
};
