import styles from './loader.module.css';
import { ReactNode } from 'react';
import loaderImageSrc from './ui/loader-image.webp';

type LoaderProps = {
  enabled: boolean;
  children: ReactNode;
};

export const Loader = ({ children, enabled }: LoaderProps) => {
  if (!enabled) {
    return children;
  }

  return (
    <div className={styles.background}>
      <img src={loaderImageSrc} alt="loader" className={styles.loader} />
    </div>
  );
};
