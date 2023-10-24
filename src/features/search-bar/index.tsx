import { Component } from 'react';
import styles from './index.module.css';
import searchIconSrc from './ui/search-icon.svg';

export class SearchBar extends Component {
  render() {
    return (
      <form className={styles.searchBar}>
        <input
          type="search"
          placeholder="Search…"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchSubmit}>
          <img src={searchIconSrc} alt="search button" width={24} height={24} />
        </button>
      </form>
    );
  }
}
