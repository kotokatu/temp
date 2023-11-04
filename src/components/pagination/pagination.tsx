import { ChangeEvent, useState } from 'react';

import './pagination.css';
import { AppStateToProps } from '../types';

const Pagination: React.FC<AppStateToProps> = (
  props: AppStateToProps
): JSX.Element => {
  const {
    mainState: { setLimit, page, setPage, lastPage },
  } = props;

  const [currentLimit, setCurrentLimit] = useState<string>('');
  const firstPage: string = `1`;

  const onGetDataWithLimit = (): void => {
    setPage(firstPage);
    setLimit(currentLimit);
  };

  const onSetLimit = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentLimit(event.target.value.trim());
  };

  const onPrevPage = (): void => {
    const prevPage: string = `${+page - +firstPage}`;
    if (+page > +firstPage) {
      setPage(prevPage);
    }
  };

  const onNextPage = (): void => {
    const nextPage: string = `${+page + +firstPage}`;
    if (+page < +lastPage) {
      setPage(nextPage);
    }
  };

  return (
    <div className="pagination-bar">
      <ul className="pagination">
        <li className="page-item disabled" onClick={onPrevPage}>
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
          placeholder="default 10..."
          onChange={onSetLimit}
          value={currentLimit}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={onGetDataWithLimit}
        >
          Set limit
        </button>
      </div>
    </div>
  );
};

export default Pagination;
