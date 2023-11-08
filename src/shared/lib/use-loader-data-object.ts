import { useLoaderData } from 'react-router-dom';
import { isObject } from './is-object';

export const useLoaderDataObject = (): Record<string, unknown> => {
  const loaderData = useLoaderData();

  if (!isObject(loaderData)) {
    throw new Error('loaderData is not object');
  }

  return loaderData;
};
