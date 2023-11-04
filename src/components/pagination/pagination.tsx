import { ChangeEvent, FormEvent, useState } from 'react';

import './pagination.css';
import { AppStateToProps } from '../types';

const Pagination: React.FC<AppStateToProps> = (
  props: AppStateToProps
): JSX.Element => {
  const {
    mainState: { setLimit, page, setPage, lastPage, limit },
  } = props;

  const [currentLimit, setCurrentLimit] = useState<string>(limit);
  const firstPage: string = `1`;

  const onGetDataWithLimit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
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
        <li
          className={`page-item ${+page > +firstPage ? '' : 'disabled'}`}
          onClick={onPrevPage}
        >
          <span className="page-link">&laquo;</span>
        </li>
        <li className="page-item active">
          <span className="page-link current-page">{page}</span>
        </li>
        <li
          className={`page-item ${+page < +lastPage ? '' : 'disabled'}`}
          onClick={onNextPage}
        >
          <span className="page-link">&raquo;</span>
        </li>
      </ul>
      <form className="limit input-group mb-3" onSubmit={onGetDataWithLimit}>
        <input
          type="text"
          className="form-control"
          placeholder="default 10..."
          onChange={onSetLimit}
          value={currentLimit}
        />
        <button className="btn btn-primary" type="button">
          Set limit
        </button>
      </form>
    </div>
  );
};

export default Pagination;
