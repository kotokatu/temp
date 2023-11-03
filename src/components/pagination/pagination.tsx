import { ChangeEvent, useState } from 'react';

import './pagination.css';
import { AppStateToProps } from '../types';

const Pagination: React.FC<AppStateToProps> = (
  props: AppStateToProps
): JSX.Element => {
  const {
    mainState: { searchData },
  } = props;
  const [limit, setLimit] = useState<string>('10');

  const onGetData = (): void => {
    searchData(limit);
  };

  const onSetLimit = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(event.target.value);
  };

  return (
    <div className="pagination-bar">
      <ul className="pagination">
        <li className="page-item disabled">
          <a className="page-link" href="#">
            &laquo;
          </a>
        </li>
        <li className="page-item active">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            &raquo;
          </a>
        </li>
      </ul>
      <div className="limit input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Set limit"
          onChange={onSetLimit}
          value={limit}
        />
        <button className="btn btn-primary" type="button" onClick={onGetData}>
          Button
        </button>
      </div>
    </div>
  );
};

export default Pagination;
