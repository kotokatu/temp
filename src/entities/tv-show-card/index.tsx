import { Component } from 'react';
import { ApiShowSummary } from 'shared/api/myshows/types/response.type';

export class TVShowCard extends Component<{ data: ApiShowSummary }> {
  render() {
    const { title } = this.props.data;
    return <h2>{title}</h2>;
  }
}
