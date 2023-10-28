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

  renderItems(): JSX.Element[] {
    const {
      mainState: { people },
    } = this.props;

    return people.map((person: IPerson) => {
      const { name, gender, birth_year, eye_color } = person;

      return (
        <div className="person-card card d-flex flex-row mb-3" key={name}>
          <img
            className="person-image"
            src={`https://starwars-visualguide.com/assets/img/characters/${3}.jpg`}
            alt="character"
          />
          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span>{`Gender: ${gender}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Birth Year: ${birth_year}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Eye Color: ${eye_color}`}</span>
              </li>
            </ul>
          </div>
        </div>
      );
    });
  }

  render(): JSX.Element {
    const {
      mainState: { loading },
    } = this.props;

    if (loading) return <Loader />;

    const items: JSX.Element[] = this.renderItems();

    return (
      <div>
        Characters
        {items}
      </div>
    );
  }
}
