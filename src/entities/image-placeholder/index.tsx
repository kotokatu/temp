import { FC } from 'react';
import styles from './image-placeholder.module.css';
import loaderImageSrc from './ui/placeholder-image.webp';

export const ImagePlaceholder: FC = () => {
  return (
    <div className={styles.background}>
      <img
        src={loaderImageSrc}
        alt="image-placeholder"
        className={styles.image}
      />
    </div>
  );
};
