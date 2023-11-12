import { useContext } from 'react';
import { ThemeContext } from '../pages/SearchPage';

const Status = () => {
  const { status, count } = useContext(ThemeContext);
  if (status !== '...Loading') return <>{`${count} found`}</>;
  return <>{status}</>;
};

export default Status;
