import { useContext } from 'react';
import { Context } from '../../../API/api';
import { ThemeContext } from '../../../pages/SearchPage';
import { getSearchLink } from '../../../router/routes';

const useListData = (inputContext?: Context) => {
  const context = useContext(ThemeContext);
  const count = inputContext?.count ?? context.count;
  const linesPerPage = inputContext?.linesPerPage ?? context.linesPerPage;
  const page = inputContext?.page ?? context.page;
  const items = inputContext?.items ?? context.items;

  const start = (page - 1) * linesPerPage;
  const finish = Math.min(start + linesPerPage, count);
  const startOffset = start + 1;
  const finishOffset = count - start;
  const hidden = !count || start > finish || start < 0;
  const getName = (index: number) => items[index]?.name;
  const getLink = (index: number) => getSearchLink(index, page, linesPerPage);

  return {
    count,
    linesPerPage: linesPerPage,
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
