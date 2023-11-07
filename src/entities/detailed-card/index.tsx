import { ImagePlaceholder } from 'entities/image-placeholder';
import { Skeleton } from 'features/skeleton';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Endpoint, defaultLanguage } from 'shared/constants';
import { useLoaderDataObject } from 'shared/lib/use-loader-data-object';
import styles from './detailed-card.module.css';
import { useFetchDetailedCardData } from './lib/use-fetch-detailed-card-data';
import { DetailType } from './model/types';
import closeIconSrc from './ui/close-icon.svg';

const Detail = ({ title, value, secondaryValue, href }: DetailType) => {
  if (value) {
    return (
      <>
        <dt className={styles.title}>{title}</dt>
        <dd className={styles.details}>
          {href ? (
            <a href={href} target="_blank" rel="noreferrer">
              {value}
            </a>
          ) : (
            value
          )}
          {secondaryValue && secondaryValue !== value && ` (${secondaryValue})`}
        </dd>
      </>
    );
  }
};

export const DetailedCard = () => {
  const { id } = useLoaderDataObject();
  const location = useLocation();
  const navigation = useNavigate();

  if (typeof id !== 'string') {
    throw new Error('Wrong query types');
  }

  const handleClose = () => {
    navigation(`${Endpoint.ROOT}${location.search}`);
  };

  const fetchTVShowDetailsParams = useMemo(
    () => ({ showId: +id, withEpisodes: true }),
    [id]
  );
  const { details, isFetching } = useFetchDetailedCardData(
    fetchTVShowDetailsParams,
    defaultLanguage
  );

  if (details === null) {
    return <ImagePlaceholder />;
  }

  const {
    title,
    titleOriginal,
    status,
    started,
    ended,
    countryTitle,
    country,
    network,
    runtimeTotal,
    runtime,
    episodes,
    totalSeasons,
    imdbRating,
    imdbUrl,
    kinopoiskRating,
    kinopoiskUrl,
    rating,
  } = details;

  return (
    <Skeleton enabled={isFetching}>
      <div className={styles.interceptor} onClick={handleClose} />
      <aside className={`${styles.container} scrollbar`}>
        <button className={styles.close} onClick={handleClose}>
          <img src={closeIconSrc} alt="close button" width={24} height={24} />
        </button>
        <h2 className={styles.heading}>
          {title}
          {titleOriginal && titleOriginal !== title && ` (${titleOriginal})`}
        </h2>
        <dl className={styles.detailList}>
          <Detail title="Status" value={status} />
          {(started || ended) && (
            <>
              <dt className={styles.title}>Date:</dt>
              <dd className={styles.details}>
                {started
                  ? new Date(started).toLocaleDateString(defaultLanguage)
                  : '…'}
                {' - '}
                {ended
                  ? new Date(ended).toLocaleDateString(defaultLanguage)
                  : '…'}
              </dd>
            </>
          )}
          <Detail
            title="Country"
            value={countryTitle}
            secondaryValue={country}
          />
          <Detail title="Network" value={network?.title} />
          <Detail title="Total running time" value={runtimeTotal} />
          <Detail title="Episode duration (min)" value={runtime} />
          <Detail title="Episodes count" value={episodes?.length} />
          <Detail title="Seasons" value={totalSeasons} />
          <Detail
            title="IMDB Rating (of 10)"
            value={imdbRating}
            href={imdbUrl}
          />
          <Detail
            title="Kinopoisk Rating (of 10)"
            value={kinopoiskRating}
            href={kinopoiskUrl}
          />
          <Detail
            title="MyShows Rating (of 5)"
            value={rating}
            href={`https://myshows.me/view/${id}`}
          />
        </dl>
      </aside>
    </Skeleton>
  );
};
