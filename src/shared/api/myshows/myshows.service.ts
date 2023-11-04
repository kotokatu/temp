import { isObject } from 'shared/lib/is-object';
import { Language } from 'shared/types/Language';
import { isApiShowSummary } from './typeguards/is-api-show-summary.guard';
import { isGetByIdResponseBody } from './typeguards/is-get-by-id-response-body.guard';
import {
  ApiShowSummary,
  GetByIdRequest,
  GetByIdRequestBody,
  GetByIdResponse,
  GetByIdResponseBody,
  GetRequest,
  GetRequestBody,
  GetResponse,
} from './types';

const baseUrl = 'https://api.myshows.me/v2/rpc/';
const defaultLang: Language = 'en';

const fetchJson = async <TRequest, TResponse>(
  body: TRequest,
  lang: Language = defaultLang
): Promise<TResponse> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': lang,
    },
    body: JSON.stringify(body),
  });

  return response.json();
};

type TVShowListResponse = {
  count: number;
  list: ApiShowSummary[];
};

export const isTVShowListResponse = (
  obj: unknown
): obj is TVShowListResponse => {
  if (!isObject(obj)) {
    return false;
  }
  return (
    typeof obj.count === 'number' &&
    Array.isArray(obj.list) &&
    obj.list.every(isApiShowSummary)
  );
};

export const fetchTVShowList = async (
  params: GetRequestBody,
  lang: Language
): Promise<TVShowListResponse> => {
  type TRequest = [GetRequest, GetRequest];
  type TResponse = [GetResponse<number>, GetResponse<ApiShowSummary[]>];

  const body: TRequest = [
    {
      jsonrpc: '2.0',
      method: 'shows.Count',
      params,
      id: 1,
    },
    {
      jsonrpc: '2.0',
      method: 'shows.Get',
      params,
      id: 2,
    },
  ];

  const [count, list] = await fetchJson<TRequest, TResponse>(body, lang);

  const result = {
    count: count.result,
    list: list.result,
  };

  if (!isTVShowListResponse(result)) {
    throw Error('wrong type from api');
  }

  return result;
};

export const fetchTVShowById = async (
  params: GetByIdRequestBody,
  lang: Language
): Promise<GetByIdResponseBody> => {
  const body: GetByIdRequest = {
    jsonrpc: '2.0',
    method: 'shows.GetById',
    params,
    id: 1,
  };

  const { result } = await fetchJson<GetByIdRequest, GetByIdResponse>(
    body,
    lang
  );

  if (!isGetByIdResponseBody(result)) {
    throw Error('wrong type from api');
  }

  return result;
};
