import styles from './index.module.css';
import { SearchBar } from 'features/search-bar';
import { Component } from 'react';
import { Header } from 'widgets/header';
import { TVShowList } from 'widgets/tv-show-list';

export class MainPage extends Component {
  state = {
    searchQuery: '',
  };

  render() {
    const handleSearchSubmit = (searchQuery: string) => {
      this.setState({ searchQuery });
    };

    return (
      <>
        <Header>
          <SearchBar onSearchSubmit={handleSearchSubmit} />
        </Header>
        <main className={styles.main}>
          <TVShowList searchQuery={this.state.searchQuery} />
        </main>
      </>
    );
  }
}
