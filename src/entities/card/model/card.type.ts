import { ApiShowSummary } from 'shared/api/myshows/types/api-show-summary.type';

export type CardProps = Pick<
  ApiShowSummary,
  'id' | 'title' | 'status' | 'year' | 'image' | 'totalSeasons' | 'rating'
>;
