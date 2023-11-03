import { ResponseApi, Character } from '../components/types';

export default class Api {
  private baseApi: string = 'https://the-one-api.dev/v2';

  private headers = {
    Accept: 'application/json',
    Authorization: 'Bearer wkoXezrpBmu_Ap4_XAKL',
  };

  private async getData(url: string): Promise<ResponseApi> {
    const response: Response = await fetch(`${this.baseApi}${url}`, {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(
        `Could not get data on request ${url}` + `, status ${response.status}`
      );
    }
    return response.json();
  }

  public search = async (
    term: string,
    limit: string = '10'
  ): Promise<Character[]> => {
    const response: ResponseApi = await this.getData(
      `/character?name=/${term}/i&page=1&limit=${limit}`
    );

    return response.docs;
  };
}
