import { LoaderFunction } from 'react-router-dom';

export const detailedCardLoader: LoaderFunction = ({ params: { id } }) => {
  return { id };
};
