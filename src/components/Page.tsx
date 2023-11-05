import { NavLink } from 'react-router-dom';
import { RouterPath } from './AppRoutes';

type Props = {
  current: number;
  count: number;
  linesPerPage: number;
  linksToPages: number;
};
type PageButton = { link: number; label: string };
const pageLimits: number[] = [5, 10, 20, 50, 100];
const Page = (props: Props) => {
  const count = Math.ceil(props.count / props.linesPerPage);
  const pageStart = Math.max(1, props.current - props.linksToPages);
  const pageEnd = Math.min(props.current + props.linksToPages, count);
  const plusStart = pageStart - props.current + props.linksToPages;
  const plusEnd = props.current + 1 - pageEnd;

  const pages: PageButton[] = [];
  const start = Math.max(1, pageStart - plusStart - plusEnd - 1);
  const end = Math.min(start + 2 * props.linksToPages, count);
  if (props.current >= start && props.current <= count) {
    if (props.current > 1) pages.push({ link: props.current - 1, label: '<' });
    for (let i = start; i <= end; i++) {
      const label = i === props.current ? `[${props.current}]` : `${i}`;
      const link = i;
      pages.push({ link, label });
    }
    if (props.current < count)
      pages.push({ link: props.current + 1, label: '>' });
  }
  return (
    <ul className="pages">
      {pages.map(({ link, label }, index) => {
        return (
          <li className="pages" key={`page-${index}`}>
            <NavLink
              className="page-link"
              to={`${RouterPath.SEARCH}?&page=${link}&limit=${props.linesPerPage}`}
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
