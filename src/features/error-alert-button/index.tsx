import { useState } from 'react';
import errorAlertIconSrc from './ui/error-alert-icon.svg';
import styles from './error-alert-button.module.css';

export const ErrorAlertButton = () => {
  const [errorTriggered, setErrorTriggered] = useState(false);

  if (errorTriggered) {
    throw new Error('Oops! Something gone wrong >_<');
  }

  const handleClick = () => {
    setErrorTriggered(true);
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
};
