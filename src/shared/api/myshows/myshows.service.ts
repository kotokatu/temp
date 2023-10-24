import { GetRequest, GetRequestBodySearch } from './types/request.type';
import { GetResponse } from './types/response.type';

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

    const json = await this.fetchJson(body);

    return json;
  }

  private static async fetchJson(
    body: GetRequest,
    lang = this.defaultLang
  ): Promise<GetResponse> {
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
