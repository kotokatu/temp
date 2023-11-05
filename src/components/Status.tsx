type Props = {
  status: string;
  linesPerPage: number;
};

const Status = (props: Props) => {
  const { status } = props;

  return <>{status}</>;
};

export default Status;
