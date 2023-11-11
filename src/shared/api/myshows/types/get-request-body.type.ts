import { GetRequestBodySearch } from './get-request-body-search.type';

export type GetRequestBody = {
  search: GetRequestBodySearch;
  page?: number;
  pageSize?: number;
};
