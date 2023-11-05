import { LoaderFunction } from 'react-router-dom';

export const tvShowDetailsLoader: LoaderFunction = ({ params: { id } }) => {
  return { id };
};
