import { Component } from 'react';
import errorAlertIconSrc from './ui/error-alert-icon.svg';
import styles from './index.module.css';

export class ErrorAlertButton extends Component {
  state = { errorTriggered: false };

  render() {
    if (this.state.errorTriggered) {
      throw new Error('Oops! Something gone wrong >_<');
    }

    const handleClick = () => {
      this.setState({ errorTriggered: true });
    };
    return (
      <button className={styles.fab} onClick={handleClick}>
        <img
          src={errorAlertIconSrc}
          alt="error alert icon"
          width={24}
          height={24}
        />
      </button>
    );
  }
}
