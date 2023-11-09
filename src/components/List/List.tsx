import { NavLink } from 'react-router-dom';
import useListMath from './hooks/useListData';

const List = () => {
  const { linesPerPage, startOffset, finishOffset, hidden, getName, getLink } =
    useListMath();
  const items = Array<string>(linesPerPage).fill('');

  if (hidden) return <></>;

  const linkItem = (index: number) => {
    if (index < finishOffset)
      return (
        <li key={index}>
          <NavLink to={getLink(index + startOffset)}>{getName(index)}</NavLink>
        </li>
      );
    return <br key={index} />;
  };

  return (
    <ol start={startOffset}>{items.map((item, index) => linkItem(index))}</ol>
  );
};

export default List;
