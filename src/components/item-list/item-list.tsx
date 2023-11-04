import { AppStateToProps, Character } from '../types';

import './item-list.css';
import Loader from '../loader';
import ItemDetails from '../item-details';

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

  if (loading) return <Loader />;

  const items: JSX.Element[] = renderItems();
  const message: JSX.Element | null = items.length ? null : (
    <p className="list-message text-warning">
      Oops. There is no such character in our database.
    </p>
  );

  return (
    <div className="item-list">
      <section className="section-left"> {items}</section>
      <ItemDetails itemData={itemData} />
      {message}
    </div>
  );
};

export default ItemList;
