import Loader from '../loader';
import { ItemDetailsProps } from '../types';

import './item-details.css';

const ItemDetails: React.FC<ItemDetailsProps> = ({
  loadingItem,
  setId,
  itemData,
}) => {
  function renderItem(): JSX.Element {
    const { name, gender, race, birth, _id } = itemData[0];
    return (
      <section className="section-right">
        <div className="details-card card d-flex flex-row mb-3" key={_id}>
          <button
            type="button"
            className="btn-close"
            onClick={() => setId('')}
          ></button>
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
      </section>
    );
  }

  const item: JSX.Element | null = itemData.length ? renderItem() : null;
  const content: JSX.Element | null = loadingItem ? (
    <section className="section-right">
      <Loader />
    </section>
  ) : (
    item
  );

  return content;
};

export default ItemDetails;
