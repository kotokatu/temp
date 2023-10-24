export type GetRequestBodySearch = {
  network?: number;
  genre?: number;
  country?: string;
  year?: number;
  watching?: number;
  category?: string;
  status?: string;
  sort?: string; // totalSeasons_desc, year_asc etc. ,
  query?: string;
};

export type GetRequestBody = {
  search: GetRequestBodySearch;
  page?: number;
  pageSize?: number;
};

export type GetRequest = {
  jsonrpc: string;
  method: string;
  params: GetRequestBody;
  id: number;
};
