import { useStore } from 'app/store';
import { ActionType } from 'app/store/model/enums';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { useFetcher, useSearchParams } from 'react-router-dom';
import {
  defaultPageValue,
  defaultQueryValue,
  pageParamName,
  queryParamName,
} from 'shared/constants';
import styles from './search.module.css';
import searchIconSrc from './ui/search-icon.svg';

export const Search: FC = () => {
  const fetcher = useFetcher();
  const { state, dispatch } = useStore();
  const [, setSearchParams] = useSearchParams();

  const saveSearchValueToLocalStorage = (searchValue: string): void => {
    dispatch({ type: ActionType.SavedSearchValueToLocalStorage, searchValue });
  };

  const saveSearchValueToSearchParams = (searchValue: string): void => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev.entries()),
      [queryParamName]: searchValue,
      [pageParamName]: defaultPageValue.toString(),
    }));
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchValue = e.target.value;
    dispatch({ type: ActionType.ChangedSearchValueState, searchValue });
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const submittedValue =
        formData.get(queryParamName)?.toString() ?? defaultQueryValue;

      saveSearchValueToLocalStorage(submittedValue);

      saveSearchValueToSearchParams(submittedValue);
    }
  };

  return (
    <fetcher.Form className={styles.container} onSubmit={handleFormSubmit}>
      <input
        type="search"
        placeholder="Search…"
        className={styles.input}
        name={queryParamName}
        value={state.searchValue}
        onChange={handleInputChange}
        autoFocus={true}
        autoComplete={'off'}
      />
      <button className={styles.submit}>
        <img src={searchIconSrc} alt="search button" width={24} height={24} />
      </button>
    </fetcher.Form>
  );
};
