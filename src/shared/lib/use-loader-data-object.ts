import { useLoaderData } from 'react-router-dom';
import { isObject } from './is-object';

export const useLoaderDataObject = () => {
  const loaderData = useLoaderData();

  if (!isObject(loaderData)) {
    throw new Error('loaderData is not object');
  }

  return loaderData;
};
