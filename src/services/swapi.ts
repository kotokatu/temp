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

  getAllPeople = async () => {
    const response = await this.getData(`/people/?page=1`);
    return response.results;
  };

  search = async (term: string) => {
    const response = await this.getData(`/people/?search=${term}`);
    return response.results;
  };
}
