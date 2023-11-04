import { LoaderFunction, redirect } from 'react-router-dom';
import { fetchTVShowList } from 'shared/api/myshows/myshows.service';
import {
  defaultLanguage,
  defaultPageSizeValue,
  defaultPageValue,
  defaultQueryValue,
  pageParamName,
  pageSizeParamName,
  queryParamName,
  searchQueryLocalStorageKey,
} from 'shared/constants';

const getSearchParams = (searchParams: URLSearchParams) => {
  const query =
    searchParams.get(queryParamName) ??
    localStorage.getItem(searchQueryLocalStorageKey) ??
    defaultQueryValue;

  const page = searchParams.get(pageParamName) ?? `${defaultPageValue}`;
  const pageSize =
    searchParams.get(pageSizeParamName) ?? `${defaultPageSizeValue}`;

  return { query, page, pageSize };
};

export const mainPageLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const { query, page, pageSize } = getSearchParams(url.searchParams);

  const params = {
    [queryParamName]: query,
    [pageParamName]: page,
    [pageSizeParamName]: pageSize,
  } as const;

  if (Object.keys(params).some((param) => !url.searchParams.has(param))) {
    Object.entries(params).forEach((args) => url.searchParams.set(...args));
    return redirect(url.toString());
  }

  const tvShowListData = fetchTVShowList(
    { search: { query }, page: +page - 1, pageSize: +pageSize },
    defaultLanguage
  );

  return { tvShowListData };
};
