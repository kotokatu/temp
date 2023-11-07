import { Card } from 'entities/card';
import styles from './card-list.module.css';
import { CardListProps } from './model/types';

export const CardList = ({ list }: CardListProps) => {
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
