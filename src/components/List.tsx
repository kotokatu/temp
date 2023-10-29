import React from 'react';

type Items = string;
type Props = {
  current: number;
  count: number;
  items: Items[];
};

class List extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    console.log('^^^^', this.props.items);
    const items: Items[] = Array(10).fill('');
    const page = this.props.current;
    const count = this.props.count;
    const start = (page - 1) * 10;
    const end = Math.min(start + 10, count);
    if (!count || start > end || start < 0) return <></>;

    return (
      <ol start={page * 10 - 9}>
        {items.map((item, index) => (
          <li key={index}>{this.props.items[index]}</li>
        ))}
      </ol>
    );
  }
}

export default List;
