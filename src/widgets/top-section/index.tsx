import { Search } from 'features/search';
import { FC } from 'react';
import styles from './top-section.module.css';

export const TopSection: FC = () => {
  return (
    <div className={styles.searchBarSection}>
      <Search />
    </div>
  );
};
