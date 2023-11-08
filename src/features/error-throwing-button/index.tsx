import { FC, useState } from 'react';
import errorAlertIconSrc from './ui/error-button-icon.svg';
import styles from './error-throwing-button.module.css';

export const ErrorThrowingButton: FC = () => {
  const [errorTriggered, setErrorTriggered] = useState(false);

  if (errorTriggered) {
    throw new Error('Oops! Something gone wrong >_<');
  }

  return (
    <button
      className={styles.fab}
      onClick={(): void => {
        setErrorTriggered(true);
      }}
    >
      <img
        src={errorAlertIconSrc}
        alt="error alert icon"
        width={24}
        height={24}
      />
    </button>
  );
};
