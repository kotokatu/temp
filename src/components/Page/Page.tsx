import usePageData from './hooks/usePageData';
import { NavLink } from 'react-router-dom';

const pageLimits: number[] = [5, 10, 20, 50, 100];
const Page = () => {
  const { getPageLinks, getPageLink, getLinesPerPageLink } = usePageData();
  const pages = getPageLinks();
  const linkItem = (
    key: string,
    className: string,
    link: string,
    label: string
  ) => {
    return (
      <li key={key} className={className}>
        <NavLink to={link}>{label}</NavLink>
      </li>
    );
  };
  return (
    <>
      <ul className="pages">
        {pages.map(({ link, label }, index) =>
          linkItem(`page-${index}`, 'page-link', getPageLink(link), label)
        )}
      </ul>
      <ul>
        {pageLimits.map((limit, index) =>
          linkItem(
            `page-limits--${index}`,
            'page-link',
            getLinesPerPageLink(limit),
            `${limit}`
          )
        )}
      </ul>
    </>
  );
};

export default Page;
