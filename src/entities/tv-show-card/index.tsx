import styles from './index.module.css';
import { Component } from 'react';
import { ApiShowSummary } from 'shared/api/myshows/types';

type TProps = { summary: ApiShowSummary };

export class TVShowCard extends Component<TProps> {
  private static getStyledStatus(status: string = '') {
    const dict: Record<string, { style: string; text: string }> = {
      'Canceled/Ended': { style: styles.dead, text: 'Closed' },
      'Returning Series': { style: styles.onAir, text: 'On Air' },
      'TBD/On The Bubble': { style: styles.pause, text: 'Paused' },
      'New Series': { style: styles.new, text: 'New' },
    } as const;
    return dict[status];
  }

  render() {
    const { title, status, year, image, totalSeasons, rating } =
      this.props.summary;

    const styledStatusData = TVShowCard.getStyledStatus(status);
    const styledStatus = styledStatusData && (
      <span className={styledStatusData.style}>{styledStatusData.text}</span>
    );

    return (
      <>
        <h2 className={styles.cardHeading}>{title}</h2>
        <img
          className={styles.image}
          src={image}
          alt={`${title} image`}
          width={320}
          height={180}
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
  }
}
