import { TVShowCard } from 'entities/tv-show-card';
import { ApiShowSummary } from 'shared/api/myshows/types';
import styles from './tv-show-list.module.css';

type TVShowListProps = { currentList: ApiShowSummary[] };

export const TVShowList = ({ currentList }: TVShowListProps) => {
  if (currentList.length <= 0) {
    return <p>No results</p>;
  }

  return (
    <ul className={`${styles.list} scrollbar`}>
      {currentList.map(
        ({ id, title, status, year, image, totalSeasons, rating }) => (
          <li className={styles.listItem} key={id}>
            <TVShowCard
              id={id}
              title={title}
              status={status}
              year={year}
              image={image}
              totalSeasons={totalSeasons}
              rating={rating}
            />
          </li>
        )
      )}
    </ul>
  );
};
