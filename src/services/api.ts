import { ResponseApi } from '../components/types';

export default class Api {
  private baseApi: string = 'https://the-one-api.dev/v2';

  private headers = {
    Accept: 'application/json',
    Authorization: 'Bearer wkoXezrpBmu_Ap4_XAKL',
  };

  private async getData(url: string): Promise<ResponseApi | string> {
    try {
      const response: Response = await fetch(`${this.baseApi}${url}`, {
        headers: this.headers,
      });
      if (
        response.status !== 200 &&
        'statusText' in response &&
        typeof response.statusText === 'string'
      ) {
        return response.statusText;
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) return error.message;
      throw new Error('Something bad happened!');
    }
  }

  public search = async (
    term: string,
    limit: string,
    page: string
  ): Promise<ResponseApi | string> => {
    const response: ResponseApi | string = await this.getData(
      `/character?name=/${term}/i&page=${page || '1'}&limit=${limit || '10'}`
    );

    if (typeof response === 'string') {
      return response;
    }

    return response;
  };
}
