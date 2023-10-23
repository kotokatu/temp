import { Component } from 'react';

export class Card extends Component<{ data: { name: string } }> {
  render() {
    const { name } = this.props.data;
    return <h2>{name}</h2>;
  }
}
