import { Component, ReactNode } from 'react';
import styles from './index.module.css';

type HeaderProps = { children: ReactNode };

export class Header extends Component<HeaderProps> {
  render() {
    return (
      <header className={styles.header}>
        <h1 hidden={true}>TV Shows List</h1>
        {this.props.children}
      </header>
    );
  }
}
