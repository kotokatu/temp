import { ImagePlaceholder } from 'entities/image-placeholder';
import { Suspense } from 'react';
import { Await, useLocation, useNavigate } from 'react-router-dom';
import { isGetByIdResponseBody } from 'shared/api/myshows/typeguards/is-get-by-id-response-body.guard';
import { defaultLanguage } from 'shared/constants';
import { useLoaderDataObject } from 'shared/lib/use-loader-data-object';
import styles from './tv-show-details.module.css';
import closeIconSrc from './ui/close-icon.svg';

type DetailType = {
  title: string;
  value?: string | number;
  secondaryValue?: string;
  href?: string;
};

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

export const TVShowDetails = () => {
  const loaderData = useLoaderDataObject();
  const location = useLocation();
  const navigation = useNavigate();

  const handleClose = () => {
    navigation(`/${location.search}`);
  };

  return (
    <Suspense fallback={<ImagePlaceholder />}>
      <Await resolve={loaderData.tvShowDetails}>
        {(tvShowDetails) => {
          if (!isGetByIdResponseBody(tvShowDetails)) {
            throw new Error('loaderData has wrong type');
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
            id,
          } = tvShowDetails;

          return (
            <aside className={`${styles.container} scrollbar`}>
              <button className={styles.close} onClick={handleClose}>
                <img
                  src={closeIconSrc}
                  alt="close button"
                  width={24}
                  height={24}
                />
              </button>
              <h2 className={styles.heading}>
                {title}
                {titleOriginal &&
                  titleOriginal !== title &&
                  ` (${titleOriginal})`}
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
          );
        }}
      </Await>
    </Suspense>
  );
};
