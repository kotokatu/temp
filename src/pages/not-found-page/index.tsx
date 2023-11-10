import { FC } from 'react';
import styles from './not-found-page.module.css';

export const NotFoundPage: FC = () => {
  return (
    <div className={styles.errorPage}>
      <h1>[404] Not Found</h1>
      <h2>Error: No route matches URL</h2>
    </div>
  );
};
