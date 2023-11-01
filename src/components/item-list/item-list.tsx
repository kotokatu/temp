import { useEffect } from 'react';
import { AppStateToProps, TransformPerson } from '../types';

import './item-list.css';
import Loader from '../loader';

const ItemList: React.FC<AppStateToProps> = (
  props: AppStateToProps
): JSX.Element => {
  const {
    mainState: { people, searchPerson, loading },
  } = props;

  useEffect((): void => {
    searchPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderItems(): JSX.Element[] {
    return people.map((person: TransformPerson): JSX.Element => {
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

  if (loading) return <Loader />;

  const items: JSX.Element[] = renderItems();
  const message: JSX.Element | null = items.length ? null : (
    <p className="text-warning">
      Oops. There is no such character in our database.
    </p>
  );

  return (
    <div className="item-list">
      {items}
      {message}
    </div>
  );
};

export default ItemList;
