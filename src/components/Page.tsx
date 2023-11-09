import { useContext } from 'react';
import { ThemeContext } from '../pages/SearchPage';
import { NavLink } from 'react-router-dom';
import { RouterPath } from './AppRoutes';

type PageButton = { link: number; label: string };
const pageLimits: number[] = [5, 10, 20, 50, 100];
const Page = () => {
  const context = useContext(ThemeContext);
  const count = Math.ceil(context.count / context.linesPerPage);
  const pageStart = Math.max(1, context.page - context.linksToPages);
  const pageEnd = Math.min(context.page + context.linksToPages, count);
  const plusStart = pageStart - context.page + context.linksToPages;
  const plusEnd = context.page + 1 - pageEnd;

  const pages: PageButton[] = [];
  const start = Math.max(1, pageStart - plusStart - plusEnd - 1);
  const end = Math.min(start + 2 * context.linksToPages, count);
  if (context.page >= start && context.page <= count) {
    if (context.page > 1) pages.push({ link: context.page - 1, label: '<' });
    for (let i = start; i <= end; i++) {
      const label = i === context.page ? `[${context.page}]` : `${i}`;
      const link = i;
      pages.push({ link, label });
    }
    if (context.page < count)
      pages.push({ link: context.page + 1, label: '>' });
  }
  return (
    <ul className="pages">
      {pages.map(({ link, label }, index) => {
        return (
          <li className="pages" key={`page-${index}`}>
            <NavLink
              className="page-link"
              to={`${RouterPath.SEARCH}?&page=${link}&limit=${context.linesPerPage}`}
            >
              {label}
            </NavLink>
          </li>
        );
      })}
      <li>
        {pageLimits.map((limit, index) => (
          <NavLink
            className="page-link"
            key={`page-limits-${index}`}
            to={`${RouterPath.SEARCH}?&page=1&limit=${limit}`}
          >
            {limit}
          </NavLink>
        ))}
      </li>
    </ul>
  );
};

export default Page;
