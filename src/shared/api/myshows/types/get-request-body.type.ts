import { GetRequestBodySearch } from '.';

export type GetRequestBody = {
  search: GetRequestBodySearch;
  page?: number;
  pageSize?: number;
};
