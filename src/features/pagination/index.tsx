import { useFetchedListDataContext } from 'app/store';
import { FC } from 'react';
import { Form, useSearchParams } from 'react-router-dom';
import {
  defaultPageSizeValue,
  defaultPageValue,
  pageParamName,
  pageSizeParamName,
} from 'shared/constants';
import styles from './pagination.module.css';

export const Pagination: FC = () => {
  const pageSizeOptions = [5, 10, 20, 30, 50];
  const { count } = useFetchedListDataContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramPage = +(searchParams.get(pageParamName) ?? defaultPageValue);
  const page = paramPage > 0 ? paramPage : defaultPageValue;

  const paramsPageSize = +(
    searchParams.get(pageSizeParamName) ?? defaultPageSizeValue
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
    <Form className={styles.container}>
      {buttons.map(([name, value]) => (
        <button
          type="button"
          key={name}
          className={styles.button}
          disabled={page === value}
          onClick={(): void => {
            setSearchParams((prev) => ({
              ...Object.fromEntries(prev.entries()),
              [pageParamName]: value.toString(),
            }));
          }}
        >
          {name}
        </button>
      ))}
      <select
        className={styles.select}
        aria-label="items per page select element"
        defaultValue={pageSize}
        onChange={(e): void => {
          setSearchParams((prev) => ({
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
    </Form>
  );
};
