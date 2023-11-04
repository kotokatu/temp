import { AppStateToProps, Character } from '../types';

import './item-list.css';
import Loader from '../loader';

const ItemList: React.FC<AppStateToProps> = (
  props: AppStateToProps
): JSX.Element => {
  const {
    mainState: { data, loading, itemData, getItemData },
  } = props;

  function renderItems(): JSX.Element[] {
    return data.map((character: Character): JSX.Element => {
      const { name, gender, race, birth, _id } = character;

      return (
        <div
          className="character-card card d-flex flex-row mb-3"
          key={_id}
          onClick={() => getItemData(_id)}
        >
          <div className={`character-image ${race.toLowerCase()}`} />
          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span>{`Gender: ${gender}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Birth: ${birth}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Race: ${race}`}</span>
              </li>
            </ul>
          </div>
        </div>
      );
    });
  }

  function renderItem(): JSX.Element {
    const { name, gender, race, birth, _id } = itemData[0];
    return (
      <section className="section-right">
        <div className="details-card card d-flex flex-row mb-3" key={_id}>
          <div className="card-body">
            <h4>
              {name}
              {_id}
            </h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span>{`Gender: ${gender}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Birth: ${birth}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Race: ${race}`}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  if (loading) return <Loader />;

  const items: JSX.Element[] = renderItems();
  const item: JSX.Element | null = itemData.length ? renderItem() : null;
  const message: JSX.Element | null = items.length ? null : (
    <p className="text-warning">
      Oops. There is no such character in our database.
    </p>
  );

  return (
    <div className="item-list">
      <section className="section-left"> {items}</section>
      {item}
      {message}
    </div>
  );
};

export default ItemList;
