import React from 'react';
import './App.css';

type Result = { name: string };
type PageButton = { link: number; label: string };
class App extends React.Component<
  { baseUrl: string },
  {
    search: string;
    result: string;
    url: string;
    page: number;
    names: string[];
    count: number;
    status: string;
  }
> {
  state = {
    search: 'Nothing',
    url: this.props.baseUrl,
    result: '',
    page: 0,
    names: [],
    count: 0,
    status: '',
  };
  componentDidMount(): void {
    console.log('didMount');
  }
  componentDidUpdate(
    prevProps: { baseUrl: string },
    prevState: { search: string; result: string; url: string }
  ): void {
    console.log('didUpdate', this.state);
    if (this.state.url !== prevState.url) {
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
  componentWillUnMount(): void {
    console.log('willUnmount');
  }
  render() {
    return (
      <>
        <h1>Starwars heros</h1>
        <div className='Search'>
          <input onChange={(e) => this.input(e.target.value)} />
          <button onClick={() => this.search()}> Search</button>
        </div>
        <div>
          {this.state.status !== '...Loading' && this.state.result}
          {this.state.status}
          {this.state.status !== '...Loading' && this.links(this.state.page)}
          {this.state.status !== '...Loading' && this.pages(this.state.page)}
        </div>
      </>
    );
  }
  setStatus = (status: string) => {
    this.setState((state) => ({
      ...state,
      status,
    }));
  };
  input = (value: string) => {
    this.setState((state) => ({
      ...state,
      search: value,
    }));
  };
  search = () => {
    this.setState((state) => ({
      ...state,
      url: `${this.props.baseUrl}${state.search}&page=1`,
    }));
  };
  result = (count: number, names: string[]) => {
    this.setState((state) => ({
      ...state,
      count: count,
      status: '',
      page: 1,
      result: `${count} found`,
      names: [...names],
    }));
  };
  go = (page: number) => {
    this.setState((state) => ({
      ...state,
      page: page,
    }));
  };
  links = (page: number) => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const start = (page - 1) * 10;
    const end = Math.min(start + 10, this.state.count);
    if (!this.state.count || start > end || start < 0) return <></>;
    return (
      <ol start={this.state.page * 10 - 9}>
        {items.slice(0, end - start).map((item, index) => (
          <li key={index}>{this.state.names[index]}</li>
        ))}
      </ol>
    );
  };

  pages = (page: number) => {
    const links = 1;
    const count = Math.ceil(this.state.count / 10);
    const pageStart = Math.max(1, page - links);
    const pageEnd = Math.min(page + links, count);
    const plusStart = pageStart - page + links;
    const plusEnd = page + 1 - pageEnd;

    const pages: PageButton[] = [];
    const start = Math.max(1, pageStart - plusStart - plusEnd);
    const end = Math.min(start + 2 * links, count);
    if (page >= start && page <= count) {
      if (this.state.page > 1) pages.push({ link: this.state.page - 1, label: '<' });
      for (let i = start; i <= end; i++) {
        const label = i === page ? `[${page}]` : `${i}`;
        const link = i;
        pages.push({ link, label });
      }
      if (this.state.page < count) pages.push({ link: this.state.page + 1, label: '>' });
    }
    return (
      <ul className='pages'>
        {pages.map(({ link, label }, index) => {
          return (
            <li className='pages' key={`page-${index}`}>
              <button key={`page-button-${index}`} onClick={() => this.go(link)}>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };
}

export default App;
