import { useFetchedListDataContext } from 'app/store';
import { Card } from 'entities/card';
import { FC } from 'react';
import styles from './card-list.module.css';

export const CardList: FC = () => {
  const { list } = useFetchedListDataContext();

  if (list.length <= 0) {
    return <p>No results</p>;
  }

  return (
    <ul className={`${styles.list} scrollbar`}>
      {list.map(({ id, title, status, year, image, totalSeasons, rating }) => (
        <li className={styles.listItem} key={id}>
          <Card
            id={id}
            title={title}
            status={status}
            year={year}
            image={image}
            totalSeasons={totalSeasons}
            rating={rating}
          />
        </li>
      ))}
    </ul>
  );
};
