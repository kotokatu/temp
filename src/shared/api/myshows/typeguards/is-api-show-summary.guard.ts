import { isTypesCorrect } from 'shared/lib/is-types-correct';
import { ApiShowSummary } from '../types';

export const isApiShowSummary = (
  obj: Record<string, unknown>
): obj is ApiShowSummary => {
  const types = [
    { key: 'id', type: 'number' },
    { key: 'title', type: 'string' },
    { key: 'titleOriginal', type: 'string' },
    { key: 'status', type: 'string' },
    { key: 'totalSeasons', type: 'number' },
    { key: 'year', type: 'number' },
    { key: 'watching', type: 'number' },
    { key: 'voted', type: 'number' },
    { key: 'rating', type: 'number' },
    { key: 'images', type: 'string', isArray: true },
    { key: 'image', type: 'string' },
    { key: 'onlineCount', type: 'number' },
    { key: 'promoUrl', type: 'string' },
    { key: 'category', type: 'string' },
  ];

  return isTypesCorrect(obj, types);
};
