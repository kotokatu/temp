import { useFetcher, useSearchParams } from 'react-router-dom';
import {
  defaultPageSizeValue,
  defaultPageValue,
  pageParamName,
  pageSizeParamName,
} from 'shared/constants';
import styles from './pagination.module.css';

type PaginationProps = {
  count: number;
  pageSizeOptions: number[];
};

export const Pagination = ({ count, pageSizeOptions }: PaginationProps) => {
  const fetcher = useFetcher();
  const [params, setParams] = useSearchParams();

  const page =
    +(params.get(pageParamName) ?? defaultPageValue) || defaultPageValue;

  const paramsPageSize = +(
    params.get(pageSizeParamName) ?? defaultPageSizeValue
  );
  const pageSize = pageSizeOptions.includes(paramsPageSize)
    ? paramsPageSize
    : defaultPageSizeValue;

  const [min, max] = [defaultPageValue, Math.ceil(count / pageSize)];
  const [prevPage, nextPage] = [
    Math.max(min, page - 1),
    Math.min(page + 1, max),
  ];

  const buttons: [string, number][] = [
    ['«', min],
    ['‹', prevPage],
    [`${page}`, page],
    ['›', nextPage],
    ['»', max],
  ];

  return (
    <fetcher.Form className={styles.container}>
      {buttons.map(([name, value]) => (
        <button
          key={name}
          className={styles.button}
          disabled={page === value}
          onClick={() => {
            setParams((prev) => {
              prev.set(pageParamName, `${value}`);
              return prev;
            });
          }}
        >
          {name}
        </button>
      ))}
      <select
        className={styles.select}
        aria-label="items per page select element"
        defaultValue={pageSize}
        onChange={(e) => {
          setParams((prev) => ({
            ...Object.fromEntries(prev.entries()),
            [pageSizeParamName]: e.target.value,
            [pageParamName]: defaultPageValue.toString(),
          }));
        }}
      >
        {pageSizeOptions.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </fetcher.Form>
  );
};
