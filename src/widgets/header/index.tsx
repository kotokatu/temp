import { Component, ReactNode } from 'react';
import styles from './index.module.css';

type HeaderProps = { children: ReactNode };

export class Header extends Component<HeaderProps> {
  render() {
    return <header className={styles.header}>{this.props.children}</header>;
  }
}
