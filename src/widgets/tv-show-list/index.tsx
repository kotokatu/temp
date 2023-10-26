import styles from './index.module.css';
import { Loader } from 'entities/loader';
import { TVShowCard } from 'entities/tv-show-card';
import { Component } from 'react';
import { MyShowsApiService } from 'shared/api/myshows/myshows.service';
import { ApiShowSummary } from 'shared/api/myshows/types';

type TProps = { searchQuery: string };
type TState = { currentList: ApiShowSummary[]; isFetching: boolean };

export class TVShowList extends Component<TProps, TState> {
  state: TState = {
    currentList: [],
    isFetching: false,
  };

  async updateTVShows() {
    this.setState({ isFetching: true });
    const query = this.props.searchQuery;
    const data = await MyShowsApiService.fetchTVShows(0, { query });
    this.setState({ currentList: data.result, isFetching: false });
  }

  componentDidMount() {
    this.updateTVShows();
  }

  componentDidUpdate(prevProps: TProps) {
    prevProps.searchQuery !== this.props.searchQuery && this.updateTVShows();
  }

  buildList() {
    const items = this.state.currentList.map((tvShow) => (
      <li className={styles.listItem} key={tvShow.id}>
        <TVShowCard summary={tvShow} />
      </li>
    ));
    return <ul className={styles.list}>{items}</ul>;
  }

  render() {
    let list;

    if (this.state.currentList.length > 0) {
      list = this.buildList();
    } else {
      list = <p>No results</p>;
    }

    return <Loader isFetching={this.state.isFetching}>{list}</Loader>;
  }
}
