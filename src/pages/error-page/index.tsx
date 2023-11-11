import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './error-page.module.css';
import { FC } from 'react';

export const ErrorMessage: FC<{ error: unknown }> = ({ error }) => {
  if (!error) {
    return null;
  }

  if (isRouteErrorResponse(error)) {
    console.error(error);
    return (
      <>
        <p className={styles.status}>
          [{error.status}] {error.statusText}
        </p>
        <p>{error.data}</p>
      </>
    );
  }

  if (error instanceof Error) {
    return <p>{error.message}</p>;
  }
};

export const ErrorPage: FC = () => {
  const error = useRouteError();

  return (
    <div className={styles.errorPage}>
      <h1>[ErrorBoundary]</h1>
      <h2>Oops... Something went wrong ((</h2>
      <ErrorMessage error={error} />
    </div>
  );
};
