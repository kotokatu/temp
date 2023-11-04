import { isTypesCorrect } from 'shared/lib/is-types-correct';
import { ApiOnlineLink } from '../types';

export const isApiOnlineLink = (
  obj: Record<string, unknown>
): obj is ApiOnlineLink => {
  const types = [
    { key: 'title', type: 'string' },
    { key: 'description', type: 'string' },
    { key: 'source', type: 'string' },
    { key: 'url', type: 'string' },
  ];

  return isTypesCorrect(obj, types);
};
