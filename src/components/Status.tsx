import { useContext } from 'react';
import { ThemeContext } from '../pages/SearchPage';

const Status = () => {
  const { status } = useContext(ThemeContext);

  return <>{status}</>;
};

export default Status;
