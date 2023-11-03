import { ChangeEvent } from 'react';

import './pagination.css';
import { AppStateToProps } from '../types';

const Pagination: React.FC<AppStateToProps> = (
  props: AppStateToProps
): JSX.Element => {
  const {
    mainState: { searchData, limit, setLimit, page, setPage, lastPage },
  } = props;

  const onGetDataWithLimit = (): void => {
    searchData();
  };

  const onSetLimit = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(event.target.value.trim());
  };

  const onNextPage = (): void => {
    const nexPage: string = `${+page + 1}`;
    if (+page < +lastPage) {
      setPage(nexPage);
      searchData();
    }
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
          <span className="page-link">{page}</span>
        </li>
        <li className="page-item" onClick={onNextPage}>
          <a className="page-link">&raquo;</a>
        </li>
      </ul>
      <div className="limit input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Set limit (def=10)..."
          onChange={onSetLimit}
          value={limit}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={onGetDataWithLimit}
        >
          Button
        </button>
      </div>
    </div>
  );
};

export default Pagination;
