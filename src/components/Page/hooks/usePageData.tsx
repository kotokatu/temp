import { useContext } from 'react';
import { ThemeContext, Context } from '../../../pages/SearchPage';
import { getSearchLink } from '../../../router/routes';
type PageButton = { link: number; label: string };

const usePageData = (inputContext?: Context) => {
  const context = useContext(ThemeContext);
  const localContext = {
    count: inputContext?.count ?? context.count,
    linesPerPage: inputContext?.linesPerPage ?? context.linesPerPage,
    linksToPages: inputContext?.linksToPages ?? context.linksToPages,
    page: inputContext?.page ?? context.page,
    items: inputContext?.items ?? context.items,
  };

  const count = Math.ceil(localContext.count / localContext.linesPerPage);
  const pageStart = Math.max(1, localContext.page - localContext.linksToPages);
  const pageFinish = Math.min(
    localContext.page + localContext.linksToPages,
    count
  );
  const plusStart = pageStart - localContext.page + localContext.linksToPages;
  const plusFinish = localContext.page + 1 - pageFinish;
  const start = Math.max(1, pageStart - plusStart - plusFinish - 1);
  const finish = Math.min(start + 2 * localContext.linksToPages, count);
  const isPageExisted =
    localContext.page >= start && localContext.page <= count;
  const isPrevPage = localContext.page > 1;
  const isNextPage = localContext.page < count;
  const prevPage = localContext.page - 1;
  const nextPage = localContext.page + 1;
  const currentPage = localContext.page;
  finish - start + 1 + Number(isPrevPage) + Number(isPrevPage);
  const pageLink = (link: number, labelType: string) => {
    const labelTypes = new Map([
      ['', `${link}`],
      ['current', `[${localContext.page}]`],
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
    getSearchLink(null, index, localContext.linesPerPage);
  const getLinesPerPageLink = (index: number) => getSearchLink(null, 1, index);

  return {
    pageLink,
    getPageLinks,
    getPageLink,
    getLinesPerPageLink,
  };
};

export default usePageData;
