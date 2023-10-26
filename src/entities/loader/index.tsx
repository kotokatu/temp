import styles from './index.module.css';
import { Component, ReactNode } from 'react';
import loaderImageSrc from './ui/loader-image.webp';

type TProps = {
  isFetching: boolean;
  children: ReactNode;
};

export class Loader extends Component<TProps> {
  render() {
    if (!this.props.isFetching) {
      return this.props.children;
    }

    return (
      <div className={styles.background}>
        <img src={loaderImageSrc} alt="loader" className={styles.loader} />
      </div>
    );
  }
}
