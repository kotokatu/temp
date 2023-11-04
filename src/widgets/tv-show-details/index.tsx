import { ImagePlaceholder } from 'entities/image-placeholder';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { isGetByIdResponseBody } from 'shared/api/myshows/typeguards/is-get-by-id-response-body.guard';
import { isObject } from 'shared/lib/is-object';
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

export const TVShowDetails = () => {
  const loaderData = useLoaderData();

  if (!isObject(loaderData)) {
    throw new Error('loaderData is not object');
  }

  return (
    <Suspense fallback={<ImagePlaceholder />}>
      <Await resolve={loaderData.tvShowDetails}>
        {(tvShowDetails) => {
          if (!isGetByIdResponseBody(tvShowDetails)) {
            throw new Error('loaderData has wrong type');
          }
          return (
            <div className={`${styles.container} scrollbar shadow`}>
              <h2 className={styles.heading}>
                {tvShowDetails.title}
                {tvShowDetails.titleOriginal &&
                  tvShowDetails.titleOriginal !== tvShowDetails.title &&
                  ` (${tvShowDetails.titleOriginal})`}
              </h2>
              <ul className={styles.detailList}>
                <Detail title="Status" value={tvShowDetails.status} />
                {(tvShowDetails.started || tvShowDetails.ended) && (
                  <li className={styles.detail}>
                    <b>Date:</b>{' '}
                    {tvShowDetails.started
                      ? new Date(tvShowDetails.started).toLocaleDateString(lang)
                      : '…'}{' '}
                    -{' '}
                    {tvShowDetails.ended
                      ? new Date(tvShowDetails.ended).toLocaleDateString(lang)
                      : '…'}
                  </li>
                )}
                <Detail
                  title="Country"
                  value={tvShowDetails.countryTitle}
                  secondaryValue={tvShowDetails.country}
                />
                <Detail title="Network" value={tvShowDetails.network?.title} />
                <Detail
                  title="Total running time"
                  value={tvShowDetails.runtimeTotal}
                />
                <Detail
                  title="Episode duration (min)"
                  value={tvShowDetails.runtime}
                />
                <Detail
                  title="Episodes count"
                  value={tvShowDetails.episodes?.length}
                />
                <Detail title="Seasons" value={tvShowDetails.totalSeasons} />
                <Detail
                  title="IMDB Rating (of 10)"
                  value={tvShowDetails.imdbRating}
                  href={tvShowDetails.imdbUrl}
                />
                <Detail
                  title="Kinopoisk Rating (of 10)"
                  value={tvShowDetails.kinopoiskRating}
                  href={tvShowDetails.kinopoiskUrl}
                />
                <Detail
                  title="MyShows Rating (of 5)"
                  value={tvShowDetails.rating}
                  href={`https://myshows.me/view/${tvShowDetails.id}`}
                />
              </ul>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};
