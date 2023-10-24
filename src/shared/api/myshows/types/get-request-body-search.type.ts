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
