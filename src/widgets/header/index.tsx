import { ReactNode } from 'react';
import styles from './header.module.css';

type HeaderProps = { children: ReactNode };

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1 hidden={true}>TV Shows List</h1>
      {children}
    </header>
  );
};
