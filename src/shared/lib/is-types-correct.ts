import { isNullOrUndefined } from './is-null-or-undefined';

export const isTypesCorrect = (
  obj: Record<string, unknown>,
  arr: { key: string; type: string; isArray?: boolean; required?: boolean }[]
) => {
  return arr.every((item) => {
    const { key, type } = item;
    const isArray = item.isArray ?? false;
    const required = item.required ?? false;

    const value = obj[key];
    if (!required && isNullOrUndefined(value)) {
      return true;
    }

    const result = isArray
      ? Array.isArray(value) && value.every((item) => typeof item === type)
      : typeof value === type;

    return result;
  });
};
