import { Component } from 'react';
import { IPerson, IStateToProps } from '../types';

import './item-list.css';
import Loader from '../loader';

export default class ItemList extends Component<IStateToProps> {
  componentDidMount(): void {
    const {
      mainState: { searchPerson },
    } = this.props;

    searchPerson();
  }

  render(): JSX.Element {
    const {
      mainState: { people, loading },
    } = this.props;

    const items: JSX.Element[] = people.map((person: IPerson) => {
      const { name, gender, eye_color, birth_year } = person;

      return (
        <li className="list-item" key={name}>
          {`${name} ${gender} ${eye_color} ${birth_year}`}
        </li>
      );
    });

    if (loading) return <Loader />;

    return (
      <div>
        People
        {items}
      </div>
    );
  }
}
