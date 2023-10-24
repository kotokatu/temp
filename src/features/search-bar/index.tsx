import { Component, FormEvent } from 'react';
import styles from './index.module.css';
import searchIconSrc from './ui/search-icon.svg';

type TProps = {
  onSearchSubmit: (searchQuery: string) => void;
};

type TState = {
  inputValue: string;
};

export class SearchBar extends Component<TProps, TState> {
  state = {
    inputValue: '',
  };

  render() {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      const trimmed = this.state.inputValue.trim();
      this.setState({ inputValue: trimmed });
      this.props.onSearchSubmit(trimmed);
    };

    const handleInput = (e: FormEvent) => {
      const { target } = e;
      if (target instanceof HTMLInputElement) {
        this.setState({ inputValue: target.value });
      }
    };

    return (
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search…"
          className={styles.searchInput}
          name="search"
          value={this.state.inputValue}
          onInput={handleInput}
        />
        <button type="submit" className={styles.searchSubmit}>
          <img src={searchIconSrc} alt="search button" width={24} height={24} />
        </button>
      </form>
    );
  }
}
