import json from './mock.json';

type ApiResponse<TResult> = {
  status_code: number;
  error: string;
  number_of_total_results: number;
  number_of_page_results: number;
  limit: number;
  offset: number;
  results: TResult[];
};

type Resource = 'character' | 'characters' | 'search';

type QueryParams = {
  field_list?: string;
  limit?: string;
  offset?: string;
};

type CharactersQueryParams = QueryParams & {
  sort?: string;
  filter?: string;
};

type SearchQueryParams = QueryParams & {
  query?: string;
  resources?: string;
  subscriber_only?: string;
};

export type Character = {
  aliases: string | null;
  deck: string | null;
  gender: number;
  id: number;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
    image_tags: string;
  };
  name: string;
  origin: { api_detail_url: string; id: number; name: string } | null;
  publisher: { api_detail_url: string; id: number; name: string } | null;
  real_name: string | null;
  site_detail_url: string;
};

const mockJson: ApiResponse<Character> = json;

export class ComicVineApiService {
  private static apiKey = import.meta.env.VITE_API_KEY;
  private static baseUrl = 'https://comicvine.gamespot.com/api';

  private static buildUrl(endpoint: Resource, query: QueryParams) {
    const url = new URL(`api/${endpoint}/`, this.baseUrl);
    const queryParams = {
      offset: '0',
      limit: '30',
      field_list: [
        'aliases',
        'deck',
        'gender',
        'id',
        'image',
        'name',
        'origin',
        'publisher',
        'real_name',
        'site_detail_url',
      ].join(','),
      ...query,
      api_key: this.apiKey,
      format: 'json',
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      return url.searchParams.set(key, value);
    });

    return url;
  }

  private static async fetchJson(...args: Parameters<typeof fetch>) {
    const res = await fetch(...args);
    return res.json();
  }

  static async fetchCharacterList(
    query?: CharactersQueryParams
  ): Promise<ApiResponse<Character>> {
    const url = this.buildUrl('characters', { ...query });
    console.log(url);
    return import.meta.env.DEV ? mockJson : this.fetchJson(url);
  }

  static async fetchSearchCharacterList(query: SearchQueryParams) {
    const url = this.buildUrl('search', { resources: 'character', ...query });
    return this.fetchJson(url);
  }
}
