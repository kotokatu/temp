import { LoaderFunction, createSearchParams, defer } from 'react-router-dom';
import { fetchTVShowList } from 'shared/api/myshows/myshows.service';

export const searchQueryLocalStorageKey = '[ER-23Q4]searchQuery';
export const defaultSearch = '';
export const defaultPage = 1;
export const defaultPageSize = 30;

export const mainPageLoader: LoaderFunction = async ({ request }) => {
  const params = createSearchParams(request.url);
  const search =
    params.get('search') ??
    localStorage.getItem(searchQueryLocalStorageKey) ??
    defaultSearch;
  const page = +(params.get('page') ?? defaultPage) - 1;
  const pageSize = +(params.get('pageSize') ?? defaultPageSize);

  const tvShowListData = fetchTVShowList(
    { search: { query: search }, page, pageSize },
    'en'
  );

  return defer({ search, tvShowListData, searchQueryLocalStorageKey });
};
