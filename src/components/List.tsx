type Items = string;
type Props = {
  current: number;
  count: number;
  items: Items[];
  linesPerPage: number;
};

const List = (props: Props) => {
  const items: Items[] = Array(props.linesPerPage).fill('');
  const count = props.count;
  const start = (props.current - 1) * props.linesPerPage;
  const end = Math.min(start + props.linesPerPage, count);
  if (!count || start > end || start < 0) return <></>;

  return (
    <ol start={start + 1}>
      {items.map((item, index) =>
        index + start < count ? (
          <li key={index}>{props.items[index]}</li>
        ) : (
          <br key={index} />
        )
      )}
    </ol>
  );
};

export default List;
