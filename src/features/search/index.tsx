import { useStore } from 'app/store';
import { ActionType } from 'app/store/model/enums';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { useFetcher } from 'react-router-dom';
import { defaultQueryValue, queryParamName } from 'shared/constants';
import styles from './search.module.css';
import searchIconSrc from './ui/search-icon.svg';

export const Search: FC = () => {
  const fetcher = useFetcher();
  const { state, dispatch } = useStore();
  const { searchValue } = state;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchValue = e.target.value;
    dispatch({ type: ActionType.ChangedSearchValueState, searchValue });
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const formDataEntryValue = formData.get(queryParamName);
      const submitValue = formDataEntryValue?.toString() ?? defaultQueryValue;
      dispatch({
        type: ActionType.ClickedSearchSubmit,
        searchValue: submitValue,
      });
    }
  };

  return (
    <fetcher.Form className={styles.container} onSubmit={handleFormSubmit}>
      <input
        type="search"
        placeholder="Search…"
        className={styles.input}
        name={queryParamName}
        value={searchValue}
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
