import { isTypesCorrect } from 'shared/lib/is-types-correct';
import { ApiNetwork } from '../types/api-network.type';

export const isApiNetwork = (
  obj: Record<string, unknown>
): obj is ApiNetwork => {
  const types = [
    { key: 'id', type: 'number' },
    { key: 'title', type: 'string' },
    { key: 'country', type: 'string' },
  ];

  return isTypesCorrect(obj, types);
};
