import { FormEvent } from 'react';
import { useFetcher, useSearchParams } from 'react-router-dom';
import {
  defaultPageValue,
  defaultQueryValue,
  pageParamName,
  queryParamName,
  searchQueryLocalStorageKey,
} from 'shared/constants';
import styles from './search.module.css';
import searchIconSrc from './ui/search-icon.svg';

export const Search = () => {
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const query =
        formData.get(queryParamName)?.toString() ?? defaultQueryValue;
      localStorage.setItem(searchQueryLocalStorageKey, query);
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev.entries()),
        [queryParamName]: query,
        [pageParamName]: defaultPageValue.toString(),
      }));
    }
  };

  return (
    <fetcher.Form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search…"
        className={styles.input}
        name={queryParamName}
        defaultValue={searchParams.get(queryParamName) ?? defaultQueryValue}
        autoFocus={true}
        autoComplete={'off'}
      />
      <button className={styles.submit}>
        <img src={searchIconSrc} alt="search button" width={24} height={24} />
      </button>
    </fetcher.Form>
  );
};
