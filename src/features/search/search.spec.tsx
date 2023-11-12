import userEvent from '@testing-library/user-event';
import { StoreProvider } from 'app/store';
import { searchQueryLocalStorageKey } from 'shared/constants';
import {
  RenderResult,
  cleanup,
  renderWithRouter,
  screen,
} from 'tests/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Search } from '.';

describe('Search', () => {
  const user = userEvent.setup();
  const renderSearch = (): RenderResult => {
    return renderWithRouter(
      <StoreProvider>
        <Search />
      </StoreProvider>
    );
  };

  beforeEach(() => {
    renderSearch();
  });

  afterEach(() => {
    cleanup();
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const searchValue = 'doctor';
    localStorage.setItem(searchQueryLocalStorageKey, '');
    expect(localStorage.getItem(searchQueryLocalStorageKey)).not.toBe(
      searchValue
    );
    await user.type(await screen.findByRole('searchbox'), searchValue);
    await user.click(await screen.findByRole('button'));
    expect(localStorage.getItem(searchQueryLocalStorageKey)).toBe(searchValue);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    const searchValue = 'dark';
    cleanup();
    localStorage.setItem(searchQueryLocalStorageKey, searchValue);
    renderSearch();
    expect(localStorage.getItem(searchQueryLocalStorageKey)).toBe(searchValue);
  });
});
