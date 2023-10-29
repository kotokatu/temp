import styles from './index.module.css';
import { Loader } from 'features/loader';
import { TVShowCard } from 'entities/tv-show-card';
import { useFetchTVShows } from './lib/use-fetch-tv-shows';

type TVShowListProps = { searchQuery: string };

export const TVShowList = ({ searchQuery }: TVShowListProps) => {
  const { currentList, isFetching } = useFetchTVShows(searchQuery);

  let list;

  if (currentList.length > 0) {
    const items = currentList.map((tvShowData) => (
      <li className={styles.listItem} key={tvShowData.id}>
        <TVShowCard
          title={tvShowData.title}
          status={tvShowData.status}
          year={tvShowData.year}
          image={tvShowData.image}
          totalSeasons={tvShowData.totalSeasons}
          rating={tvShowData.rating}
        />
      </li>
    ));
    list = <ul className={styles.list}>{items}</ul>;
  } else {
    list = <p>No results</p>;
  }

  return <Loader enabled={isFetching}>{list}</Loader>;
};
