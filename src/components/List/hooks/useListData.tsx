import { useContext } from 'react';
import { ThemeContext } from '../../../pages/SearchPage';
import { getSearchLink } from '../../../router/routes';

const useListData = () => {
  const context = useContext(ThemeContext);
  const count = context.count;
  const start = (context.page - 1) * context.linesPerPage;
  const finish = Math.min(start + context.linesPerPage, count);
  const startOffset = start + 1;
  const finishOffset = count - start;
  const hidden = !count || start > finish || start < 0;
  const getName = (index: number) => context.items[index]?.name;
  const getLink = (index: number) =>
    getSearchLink(index, context.page, context.linesPerPage);

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

export default useListData;
