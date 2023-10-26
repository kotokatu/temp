import { Component, FormEvent } from 'react';
import styles from './index.module.css';
import searchIconSrc from './ui/search-icon.svg';

type TProps = {
  searchQuery: string;
  onSearchSubmit: (searchQuery?: string) => void;
};

export class SearchBar extends Component<TProps> {
  render() {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();

      if (e.target instanceof HTMLFormElement) {
        const formData = new FormData(e.target);
        this.props.onSearchSubmit(formData.get('search')?.toString());
      }
    };

    return (
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search…"
          className={styles.searchInput}
          name="search"
          defaultValue={this.props.searchQuery}
          autoFocus={true}
          autoComplete={'off'}
        />
        <button type="submit" className={styles.searchSubmit}>
          <img src={searchIconSrc} alt="search button" width={24} height={24} />
        </button>
      </form>
    );
  }
}
