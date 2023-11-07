import { ApiShowSummary } from 'shared/api/myshows/types';

export type CardProps = Pick<
  ApiShowSummary,
  'id' | 'title' | 'status' | 'year' | 'image' | 'totalSeasons' | 'rating'
>;
