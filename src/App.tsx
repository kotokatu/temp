import React from 'react';
import Page from './components/Page';
import List from './components/List';
import './App.css';

type AppProps = { baseUrl: string };
type AppState = {
  search: string;
  result: string;
  url: string;
  page: number;
  names: string[];
  count: number;
  status: string;
};
type Result = { name: string };

class App extends React.Component<AppProps, AppState> {
  state = {
    search: `${localStorage.getItem('Search') ?? ''}`,
    url: this.props.baseUrl,
    result: '',
    page: 1,
    names: [],
    count: 0,
    status: '',
  };
  componentDidMount(): void {
    this.setState((state) => ({
      ...state,
      url: `${this.props.baseUrl}${state.search}`,
    }));
  }
  componentDidUpdate(prevProps: AppProps, prevState: AppState): void {
    if (this.state.url !== prevState.url) {
      localStorage.setItem('Search', this.state.search);
      this.setStatus('...Loading');
      fetch(this.state.url)
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((response) => {
          const { count, results } = response;
          this.result(
            count,
            results.map(({ name }: Result) => name)
          );
        })
        .catch(() => this.setStatus(`Error: Unable perform the request`));
    }
  }
  // componentWillUnMount(): void {
  //   console.log('willUnmount');
  // }

  setStatus = (status: string) => {
    this.setState((state) => ({
      ...state,
      status,
    }));
  };
  setInput = (value: string) => {
    this.setState((state) => ({
      ...state,
      search: value,
    }));
  };
  search = (page: number) => {
    this.setState((state) => ({
      ...state,
      page: page,
      search: state.search.trim(),
      url: `${this.props.baseUrl}${state.search.trim()}&page=${page}`,
    }));
  };
  result = (count: number, names: string[]) => {
    this.setState((state) => ({
      ...state,
      count: count,
      status: '',
      page: this.state.page ?? 1,
      result: `${count} found`,
      names: [...names],
    }));
  };

  render() {
    if (this.state.status === 'error') throw new Error('Simulated error');
    return (
      <>
        <h1>Star Wars Heros</h1>
        <div className='search'>
          <input
            className='input-search'
            value={this.state.search}
            onChange={(e) => this.setInput(e.target.value)}
          />
          <button onClick={() => this.search(this.state.page)}>Search</button>
          <button onClick={() => this.setStatus('error')}>Error</button>
        </div>
        <div>
          {this.state.status}
          {this.state.status !== '...Loading' && (
            <>
              {this.state.result}
              <List
                current={this.state.page}
                count={this.state.count}
                items={[...this.state.names]}
              />
              <Page current={this.state.page} count={this.state.count} setCurrent={this.search} />
            </>
          )}
        </div>
      </>
    );
  }
}

export default App;
