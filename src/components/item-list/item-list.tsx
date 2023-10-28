import { Component } from 'react';
import { IStateToProps, ITransformPerson } from '../types';

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

    return people.map((person: ITransformPerson) => {
      const { name, gender, birthYear, eyeColor, id, img } = person;

      return (
        <div className="person-card card d-flex flex-row mb-3" key={id}>
          <img className="person-image" src={img} alt="character" />
          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span>{`Gender: ${gender}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Birth Year: ${birthYear}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Eye Color: ${eyeColor}`}</span>
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
