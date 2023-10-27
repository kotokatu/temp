import { IResponse } from '../components/types';

export default class Swapi {
  private baseApi: string = 'https://swapi.dev/api';

  private async getData(url: string) {
    const response: Response = await fetch(`${this.baseApi}${url}`);

    if (!response.ok) {
      throw new Error(
        `Could not get data on request ${url}` + `, status ${response.status}`
      );
    }

    return response.json();
  }

  search = async (term: string) => {
    const response: IResponse = await this.getData(
      `/people/?search=${term}&page=1`
    );
    return response.results;
  };
}
