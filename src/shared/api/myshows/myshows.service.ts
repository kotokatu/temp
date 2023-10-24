import {
  GetByIdRequest,
  GetByIdResponse,
  GetRequest,
  GetRequestBodySearch,
  GetResponse,
} from './types';

type Language = 'en' | 'ru';

export class MyshowsApiService {
  private static baseUrl = 'https://api.myshows.me/v2/rpc/';
  private static defaultPage = 0;
  private static defaultPageSize = 30;
  private static defaultLang: Language = 'en';

  static async fetchTVShows(
    page = this.defaultPage,
    searchParams?: GetRequestBodySearch
  ): Promise<GetResponse> {
    const body: GetRequest = {
      jsonrpc: '2.0',
      method: 'shows.Get',
      params: {
        search: { ...searchParams },
        page,
        pageSize: this.defaultPageSize,
      },
      id: 1,
    };

    const json = await this.fetchJson<GetRequest, GetResponse>(body);

    return json;
  }

  static async fetchTVShowById(id: number): Promise<GetByIdResponse> {
    const body: GetByIdRequest = {
      jsonrpc: '2.0',
      method: 'shows.GetById',
      params: { showId: id },
      id: 1,
    };

    const json = await this.fetchJson<GetByIdRequest, GetByIdResponse>(body);

    return json;
  }

  private static async fetchJson<TRequest, TResponse>(
    body: TRequest,
    lang = this.defaultLang
  ): Promise<TResponse> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();

    return json;
  }
}
