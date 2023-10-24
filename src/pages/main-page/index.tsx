import styles from './index.module.css';
import { SearchBar } from 'features/search-bar';
import { Component } from 'react';
import { Header } from 'widgets/header';
import { TVShowList } from 'widgets/tv-show-list';

export class MainPage extends Component {
  render() {
    return (
      <>
        <Header>
          <SearchBar />
        </Header>
        <main className={styles.main}>
          <TVShowList />
        </main>
      </>
    );
  }
}
