import styles from './index.module.css';
import { SearchBar } from 'features/search-bar';
import { Component } from 'react';
import { Header } from 'widgets/header';
import { TVShowList } from 'widgets/tv-show-list';

type TProps = Record<string, never>;
type TState = { searchQuery: string };

export class MainPage extends Component<TProps, TState> {
  searchQueryStorageKey = '[ER-23Q4]searchQuery';

  state: TState = {
    searchQuery: localStorage[this.searchQueryStorageKey] ?? '',
  };

  render() {
    const handleSearchSubmit = (searchQuery = '') => {
      this.setState({ searchQuery });
      localStorage[this.searchQueryStorageKey] = searchQuery;
    };

    return (
      <>
        <Header>
          <SearchBar
            searchQuery={this.state.searchQuery}
            onSearchSubmit={handleSearchSubmit}
          />
        </Header>
        <main className={styles.main}>
          <TVShowList searchQuery={this.state.searchQuery} />
        </main>
      </>
    );
  }
}
