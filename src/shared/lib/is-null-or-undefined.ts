export const isNullOrUndefined = (
  value: unknown
): value is null | undefined => {
  return value === null || typeof value === 'undefined';
};
