import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

type ErrorMessageProps = {
  error: unknown;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (isRouteErrorResponse(error)) {
    console.error(error);
    return (
      <>
        <p>
          [{error.status}] {error.statusText}
        </p>
        <p>{error.data}</p>
      </>
    );
  }

  if (error instanceof Error) {
    return <p>{error.message}</p>;
  }

  return <p>{`${error}`}</p>;
};

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>[ErrorBoundary]</h1>
      <h2>Oops... Something went wrong ((</h2>
      <ErrorMessage error={error} />
    </div>
  );
};
