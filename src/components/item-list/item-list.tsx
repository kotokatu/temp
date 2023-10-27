import { Component } from 'react';
import { IStateToProps } from '../types';

import './item-list.css';

export default class ItemList extends Component<IStateToProps> {
  componentDidMount(): void {
    const {
      mainState: { searchPerson },
    } = this.props;

    searchPerson();
  }

  render(): JSX.Element {
    const {
      mainState: { people },
    } = this.props;

    const items: JSX.Element[] = people.map((person) => {
      const { name } = person;

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
