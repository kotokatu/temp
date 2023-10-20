import { Card } from 'entities/card';
import { Component } from 'react';

export class Gallery extends Component {
  render() {
    return (
      <div>
        <h1>{this.constructor.name}</h1>
        <ul>
          <li>
            <Card />
          </li>
          <li>
            <Card />
          </li>
          <li>
            <Card />
          </li>
        </ul>
      </div>
    );
  }
}
