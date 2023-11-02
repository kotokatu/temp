import styles from './tv-show-list.module.css';
import { TVShowCard } from 'entities/tv-show-card';
import { ApiShowSummary } from 'shared/api/myshows/types';

type TVShowListProps = { currentList: ApiShowSummary[] };

export const TVShowList = ({ currentList }: TVShowListProps) => {
  if (currentList.length <= 0) {
    return <p>No results</p>;
  }

  return (
    <ul className={`${styles.list} scrollbar`}>
      {currentList.map((tvShowData) => (
        <li className={`${styles.listItem} shadow`} key={tvShowData.id}>
          <TVShowCard
            title={tvShowData.title}
            status={tvShowData.status}
            year={tvShowData.year}
            image={tvShowData.image}
            totalSeasons={tvShowData.totalSeasons}
            rating={tvShowData.rating}
          />
        </li>
      ))}
    </ul>
  );
};
