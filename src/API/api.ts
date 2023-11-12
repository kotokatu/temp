import { Dispatch, SetStateAction, createContext } from 'react';
export const baseUrl = 'https://swapi.dev/api/people/?search=';
export interface Detail {
  name: string;
}
export interface DetailItemsList {
  page: number;
  limit: number;
  search: string;
  totalCount: number;
}
export interface Context {
  page: number;
  count: number;
  linesPerPage: number;
  linksToPages: number;
  items: Detail[];
  status: string;
  search: string;
  url: string;
  setStatus: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setCount: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setUrl: Dispatch<SetStateAction<string>>;
  setItems: Dispatch<SetStateAction<Detail[]>>;
  setLinesPerPage: Dispatch<SetStateAction<number>>;
}
export const getTotalCount = async (url: string) => {
  let totalCount = 0;

  await fetch(url)
    .then((response) => (response.ok ? response.json() : []))
    .then((result) => {
      totalCount = result.count;
    })
    .catch((error) => console.error(error));
  return totalCount;
};
export const getItemsList = async (params: DetailItemsList) => {
  const tempList: Detail[] = [];
  const urls: string[] = [];
  const { page, limit, search, totalCount } = params;
  const startIndex = (page - 1) * limit;
  const finishIndex = page * limit - 1;
  const startPage = Math.trunc(startIndex / 10) + 1;
  const finishPage = Math.min(
    Math.trunc(finishIndex / 10) + 1,
    Math.ceil(totalCount / 10)
  );
  const startOffset = (startPage * 10 - startIndex) % 10;
  const finishOffset = (finishPage * 10 - finishIndex - 1) % 10;
  let count = 0;
  let errorStatus = '';
  for (let pageIndex = startPage; pageIndex <= finishPage; pageIndex++)
    urls.push(`${baseUrl}${search}&page=${pageIndex}`);

  await Promise.allSettled(urls.map((url) => fetch(url)))
    .then((promises) => promises.map((promise) => Object(promise).value.json()))
    .then((promises) => Promise.allSettled(promises))
    .then((results) => {
      count = Object(results[0]).value.count ?? 0;
      return results.map((result) => Object(result).value.results);
    })
    .then((list) => {
      const resultList = list.flatMap((element) => element);
      return resultList.slice(
        startOffset,
        Math.min(
          resultList.length,
          (finishPage - startPage + 1) * 10 - finishOffset
        )
      );
    })
    // .then((flatList) => flatList.map(({ name }) => tempList.push(name)))
    .then((flatList) => flatList.map((item) => tempList.push(item)))
    .catch((error) => {
      errorStatus = `Error: Unable perform the request ${error}`;
    });
  return { items: tempList, count, errorStatus };
};

export const ThemeContext = createContext<Context>({
  page: 1,
  count: 0,
  linesPerPage: 10,
  linksToPages: 2,
  items: [],
  status: '',
  search: '',
  url: '',
  setStatus: () => null,
  setSearch: () => null,
  setCount: () => null,
  setPage: () => null,
  setItems: () => null,
  setLinesPerPage: () => null,
  setUrl: () => null,
});
