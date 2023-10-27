import styles from './index.module.css';
import { SyntheticEvent } from 'react';
import { ApiShowSummary } from 'shared/api/myshows/types';
import cardImagePlaceholderSrc from './ui/card-image-placeholder.webp';

const getStyledStatus = (status = '') => {
  const dict: Record<string, { style: string; text: string }> = {
    'Canceled/Ended': { style: styles.dead, text: 'Closed' },
    'Returning Series': { style: styles.onAir, text: 'On Air' },
    'TBD/On The Bubble': { style: styles.pause, text: 'Paused' },
    'New Series': { style: styles.new, text: 'New' },
  } as const;
  return dict[status];
};

export const TVShowCard = (props: ApiShowSummary) => {
  const { title, status, year, image, totalSeasons, rating } = props;

  const styledStatusData = getStyledStatus(status);
  const styledStatus = styledStatusData && (
    <span className={styledStatusData.style}>{styledStatusData.text}</span>
  );

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.src = cardImagePlaceholderSrc;
    }
  };

  return (
    <>
      <h2 className={styles.cardHeading}>{title}</h2>
      <img
        className={styles.image}
        src={image}
        alt={`${title} image`}
        width={320}
        height={180}
        onError={handleImageError}
      />
      <p className={styles.description}>
        Year: {year}
        <br />
        Rating: {rating}
        <br />
        Status: {styledStatus}
        <br />
        Seasons: {totalSeasons}
      </p>
    </>
  );
};
