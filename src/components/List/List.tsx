import { NavLink } from 'react-router-dom';
import useListData from './hooks/useListData';

const testEnv = process.env.NODE_ENV === 'test';
const testNode = (index: number) =>
  testEnv ? { 'data-testid': `test-node${index}` } : {};
const List = () => {
  const { linesPerPage, startOffset, finishOffset, hidden, getName, getLink } =
    useListData();
  const items = Array<string>(linesPerPage).fill('');

  if (!testEnv && hidden) return <div {...testNode(1)}></div>;

  const linkItem = (index: number) => {
    if (index < finishOffset)
      return (
        <li key={index} {...testNode(3)}>
          <NavLink to={getLink(index + startOffset)}>{getName(index)}</NavLink>
        </li>
      );
    return <br key={index} data-testid="test-list4" />;
  };

  return (
    <ol start={startOffset} {...testNode(2)}>
      {items.map((item, index) => linkItem(index))}
    </ol>
  );
};

export default List;
