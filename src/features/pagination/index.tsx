import { Dispatch, SetStateAction } from 'react';
import styles from './pagination.module.css';

type PaginationProps = {
  count: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export const Pagination = ({
  count,
  pageSize,
  setPageSize,
  page,
  setPage,
}: PaginationProps) => {
  const pageSizeOptions = [5, 10, 20, 30, 50];
  const defaultPageSize = pageSizeOptions.includes(pageSize)
    ? pageSize
    : pageSizeOptions[3];

  const [min, max] = [1, Math.ceil(count / pageSize)];
  const [prevPage, nextPage] = [
    Math.max(min, page - 1),
    Math.min(page + 1, max),
  ];

  const buttons: [string, number | null][] = [
    ['«', min],
    ['‹', prevPage],
    [`${page}`, null],
    ['›', nextPage],
    ['»', max],
  ];

  return (
    <div className={styles.wrapper + ' shadow'}>
      <div className={`${styles.container} `}>
        {buttons.map(([name, value]) => (
          <button
            className={styles.button}
            disabled={page === value}
            onClick={() => value && setPage(value)}
            key={name}
          >
            {name}
          </button>
        ))}
        <select
          onChange={(e) => {
            setPageSize(+e.target.value);
            setPage(min);
          }}
          defaultValue={defaultPageSize}
          aria-label="items per page select element"
        >
          {pageSizeOptions.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
