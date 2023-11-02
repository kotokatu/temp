import React from 'react';
type Props = {
  status: string;
  linesPerPage: number;
};

const Status = (props: Props) => {
  const { status } = props;
  // const emptyArea: React.ReactNode[] = Array(10);
  // const emptyArea = Array<JSX.Element>(10).map((item, index) => <li key={`empty-${index}`}>x</li>);
  // console.log(emptyArea);
  // const b = <li>x1</li>;
  // const bb = Array(linesPerPage + 2).fill(<br />);
  return (
    <>
      {status}
      {/* {status === '...Loading' && bb} */}
    </>
  );
};

export default Status;
