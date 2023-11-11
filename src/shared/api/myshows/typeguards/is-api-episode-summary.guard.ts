import { isTypesCorrect } from 'shared/lib/is-types-correct';
import { ApiEpisodeSummary } from '../types/api-episode-summary.type';

export const isApiEpisodeSummary = (
  obj: Record<string, unknown>
): obj is ApiEpisodeSummary => {
  const types = [
    { key: 'id', type: 'number' },
    { key: 'title', type: 'string' },
    { key: 'showId', type: 'number' },
    { key: 'seasonNumber', type: 'number' },
    { key: 'episodeNumber', type: 'number' },
    { key: 'airDate', type: 'string' },
    { key: 'airDateUTC', type: 'string' },
    { key: 'images', type: 'string', isArray: true },
    { key: 'image', type: 'string' },
    { key: 'shortName', type: 'string' },
    { key: 'commentsCount', type: 'number' },
    { key: 'isSpecial', type: 'boolean' },
  ];

  return isTypesCorrect(obj, types);
};
