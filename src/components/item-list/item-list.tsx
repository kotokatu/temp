import { Component } from 'react';

import './item-list.css';
import Swapi from '../../services/swapi';

interface IMyComponentProps {
  swapiContext: Swapi;
}

export default class ItemList extends Component<IMyComponentProps> {
  public state = {
    data: [],
  };

  componentDidMount(): void {
    this.props.swapiContext.getAllPeople().then((result) => {
      this.setState(() => {
        return {
          data: result,
        };
      });
    });
  }

  render(): JSX.Element {
    const { data } = this.state;

    const items: JSX.Element[] = data.map((item) => {
      const { name } = item;

      return (
        <li className="list-item" key={name}>
          {name}
        </li>
      );
    });

    return (
      <div>
        People
        {items}
      </div>
    );
  }
}
