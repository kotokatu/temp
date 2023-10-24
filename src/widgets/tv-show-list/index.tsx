import styles from './index.module.css';
import { TVShowCard } from 'entities/tv-show-card';
import { Component } from 'react';
import { MyShowsApiService } from 'shared/api/myshows/myshows.service';
import { ApiShowSummary } from 'shared/api/myshows/types';

type TProps = Record<string, never>;
type TState = { currentList: ApiShowSummary[] };

export class TVShowList extends Component<TProps, TState> {
  state: TState = {
    currentList: [],
  };

  async componentDidMount() {
    const data = await MyShowsApiService.fetchTVShows();
    this.setState({ currentList: data.result });
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
