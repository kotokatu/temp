import React from 'react';

type Items = string;
type Props = {
  current: number;
  count: number;
  items: Items[];
  linesPerPage: number;
};

class List extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const items: Items[] = Array(10).fill('');
    const page = this.props.current;
    const count = this.props.count;
    const linesPerPage = this.props.linesPerPage;
    const start = (page - 1) * linesPerPage;
    const end = Math.min(start + linesPerPage, count);
    if (!count || start > end || start < 0) return <></>;

    return (
      <ol start={start + 1}>
        {items.map((item, index) =>
          index + start < count ? (
            <li key={index}>{this.props.items[index]}</li>
          ) : (
            <br key={index} />
          )
        )}
      </ol>
    );
  }
}

export default List;
