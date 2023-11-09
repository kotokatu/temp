import { useContext } from 'react';
import { ThemeContext } from '../../../pages/SearchPage';
import { RouterPath } from '../../AppRoutes';

const useListMath = () => {
  const context = useContext(ThemeContext);
  const count = context.count;
  const start = (context.page - 1) * context.linesPerPage;
  const finish = Math.min(start + context.linesPerPage, count);
  const startOffset = start + 1;
  const finishOffset = count - start;
  const hidden = !count || start > finish || start < 0;
  const getName = (index: number) => context.items[index]?.name;
  const getLink = (index: number) =>
    `${RouterPath.SEARCH}/${index}?page=${context.page}&limit=${context.linesPerPage}`;

  return {
    count,
    linesPerPage: context.linesPerPage,
    start,
    finish,
    startOffset,
    finishOffset,
    hidden,
    getName,
    getLink,
  };
};

export default useListMath;
