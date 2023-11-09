import { useContext } from 'react';
import { ThemeContext } from '../pages/SearchPage';
import { NavLink } from 'react-router-dom';
import { RouterPath } from './AppRoutes';

type Items = string;

const List = () => {
  const context = useContext(ThemeContext);
  const items: Items[] = Array(context.linesPerPage).fill('');
  const count = context.count;
  const start = (context.page - 1) * context.linesPerPage;
  const end = Math.min(start + context.linesPerPage, count);
  if (!count || start > end || start < 0) return <></>;
  const link = (index: number) =>
    `${RouterPath.SEARCH}/${index}?page=${context.page}&limit=${context.linesPerPage}`;
  return (
    <ol start={start + 1}>
      {items.map((item, index) =>
        index + start < count ? (
          <li key={index}>
            <NavLink to={link(index + start + 1)}>
              {context.items[index]?.name}
            </NavLink>
          </li>
        ) : (
          <br key={index} />
        )
      )}
    </ol>
  );
};

export default List;
