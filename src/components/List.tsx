import { NavLink } from 'react-router-dom';
import { RouterPath } from './AppRoutes';
import { Detail } from '../pages/SearchPage';

type Items = string;
type Props = {
  current: number;
  count: number;
  items: Detail[];
  linesPerPage: number;
};

const List = (props: Props) => {
  const items: Items[] = Array(props.linesPerPage).fill('');
  const count = props.count;
  const start = (props.current - 1) * props.linesPerPage;
  const end = Math.min(start + props.linesPerPage, count);
  if (!count || start > end || start < 0) return <></>;
  const link = (index: number) =>
    `${RouterPath.SEARCH}/${index}?page=${props.current}&limit=${props.linesPerPage}`;
  return (
    <ol start={start + 1}>
      {items.map((item, index) =>
        index + start < count ? (
          <li key={index}>
            <NavLink to={link(index + start + 1)}>
              {props.items[index]?.name}
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
