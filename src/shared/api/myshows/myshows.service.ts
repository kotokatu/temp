import { Language } from 'shared/types/Language';
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
  const json = await response.json();

  return json;
};

export const fetchTVShowList = async (
  params: GetRequestBody,
  lang: Language
): Promise<{ count: number; list: ApiShowSummary[] }> => {
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

  return {
    count: count.result,
    list: list.result,
  };
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

  return result;
};
