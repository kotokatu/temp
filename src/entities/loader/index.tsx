import styles from './index.module.css';
import { Component } from 'react';
import loaderImageSrc from './ui/loader-image.webp';

export class Loader extends Component {
  render() {
    return (
      <div className={styles.background}>
        <img src={loaderImageSrc} alt="loader" className={styles.loader} />
      </div>
    );
  }
}
