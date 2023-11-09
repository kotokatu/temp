import { useContext } from 'react';
import { ThemeContext } from '../../../pages/SearchPage';
import { getSearchLink } from '../../../router/routes';
type PageButton = { link: number; label: string };

const usePageData = () => {
  const context = useContext(ThemeContext);
  const count = Math.ceil(context.count / context.linesPerPage);
  const pageStart = Math.max(1, context.page - context.linksToPages);
  const pageFinish = Math.min(context.page + context.linksToPages, count);
  const plusStart = pageStart - context.page + context.linksToPages;
  const plusFinish = context.page + 1 - pageFinish;
  const start = Math.max(1, pageStart - plusStart - plusFinish - 1);
  const finish = Math.min(start + 2 * context.linksToPages, count);
  const isPageExisted = context.page >= start && context.page <= count;
  const isPrevPage = context.page > 1;
  const isNextPage = context.page < count;
  const prevPage = context.page - 1;
  const nextPage = context.page + 1;
  const currentPage = context.page;
  finish - start + 1 + Number(isPrevPage) + Number(isPrevPage);
  const pageLink = (link: number, labelType: string) => {
    const labelTypes = new Map([
      ['', `${link}`],
      ['current', `[${context.page}]`],
      ['prev', '<'],
      ['next', '>'],
    ]);

    return { link, label: labelTypes.get(labelType) ?? '' };
  };
  const getPageLinks = () => {
    const pages: PageButton[] = [];
    if (isPageExisted) {
      if (isPrevPage) pages.push(pageLink(prevPage, 'prev'));
      for (let index = start; index <= finish; index++) {
        pages.push(pageLink(index, index === currentPage ? 'current' : ''));
      }
      if (isNextPage) pages.push(pageLink(nextPage, 'next'));
    }
    return pages;
  };
  const getPageLink = (index: number) =>
    getSearchLink(null, index, context.linesPerPage);
  const getLinesPerPageLink = (index: number) => getSearchLink(null, 1, index);

  return {
    getPageLinks,
    getPageLink,
    getLinesPerPageLink,
  };
};

export default usePageData;
