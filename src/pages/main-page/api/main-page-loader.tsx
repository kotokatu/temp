import { LoaderFunction } from 'react-router-dom';
import {
  defaultPageSizeValue,
  defaultPageValue,
  defaultQueryValue,
  pageParamName,
  pageSizeParamName,
  queryParamName,
  searchQueryLocalStorageKey,
} from 'shared/constants';

export const mainPageLoader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  const query =
    searchParams.get(queryParamName) ??
    localStorage.getItem(searchQueryLocalStorageKey) ??
    defaultQueryValue;
  const page = searchParams.get(pageParamName) ?? `${defaultPageValue}`;
  const pageSize =
    searchParams.get(pageSizeParamName) ?? `${defaultPageSizeValue}`;

  return { query, page, pageSize };
};
