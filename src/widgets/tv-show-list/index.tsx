import styles from './index.module.css';
import { TVShowCard } from 'entities/tv-show-card';
import { Component } from 'react';
import { MyShowsApiService } from 'shared/api/myshows/myshows.service';
import { ApiShowSummary } from 'shared/api/myshows/types';

type TProps = { searchQuery: string };
type TState = { currentList: ApiShowSummary[] };

export class TVShowList extends Component<TProps, TState> {
  state: TState = {
    currentList: [],
  };

  async updateTVShows() {
    const data = await MyShowsApiService.fetchTVShows(0, {
      query: this.props.searchQuery,
    });
    this.setState({ currentList: data.result });
  }

  componentDidMount() {
    this.updateTVShows();
  }

  componentDidUpdate(prevProps: TProps) {
    prevProps.searchQuery !== this.props.searchQuery && this.updateTVShows();
  }

  render() {
    const items = this.state.currentList.map((tvShow) => (
      <li className={styles.listItem} key={tvShow.id}>
        <TVShowCard summary={tvShow} />
      </li>
    ));
    return <ul className={styles.list}>{items}</ul>;
  }
}
