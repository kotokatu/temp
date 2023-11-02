import { GetByIdResponseBody } from 'shared/api/myshows/types';
import styles from './tv-show-details.module.css';

type DetailType = {
  title: string;
  value?: string | number;
  secondaryValue?: string;
  href?: string;
};

const lang = 'en';

const Detail = ({ title, value, secondaryValue, href }: DetailType) => {
  if (value) {
    return (
      <li className={styles.detail}>
        <b>{title}:</b>{' '}
        {href ? (
          <a href={href} target="_blank" rel="noreferrer">
            {value}
          </a>
        ) : (
          value
        )}
        {secondaryValue && secondaryValue !== value && ` (${secondaryValue})`}
      </li>
    );
  }
};

export const TVShowDetails = (details: GetByIdResponseBody) => {
  return (
    <div className={`${styles.container} scrollbar shadow`}>
      <h2 className={styles.heading}>
        {details.title}
        {details.titleOriginal &&
          details.titleOriginal !== details.title &&
          ` (${details.titleOriginal})`}
      </h2>
      <ul className={styles.detailList}>
        <Detail title="Status" value={details.status} />
        {(details.started || details.ended) && (
          <li className={styles.detail}>
            <b>Date:</b>{' '}
            {details.started
              ? new Date(details.started).toLocaleDateString(lang)
              : '…'}{' '}
            -{' '}
            {details.ended
              ? new Date(details.ended).toLocaleDateString(lang)
              : '…'}
          </li>
        )}
        <Detail
          title="Country"
          value={details.countryTitle}
          secondaryValue={details.country}
        />
        <Detail title="Network" value={details.network?.title} />
        <Detail title="Total running time" value={details.runtimeTotal} />
        <Detail title="Episode duration (min)" value={details.runtime} />
        <Detail title="Episodes count" value={details.episodes?.length} />
        <Detail title="Seasons" value={details.totalSeasons} />
        <Detail
          title="IMDB Rating (of 10)"
          value={details.imdbRating}
          href={details.imdbUrl}
        />
        <Detail
          title="Kinopoisk Rating (of 10)"
          value={details.kinopoiskRating}
          href={details.kinopoiskUrl}
        />
        <Detail
          title="MyShows Rating (of 5)"
          value={details.rating}
          href={`https://myshows.me/view/${details.id}`}
        />
      </ul>
    </div>
  );
};
