import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { data } from '../../mocks';
import App from '../../../components/app';
import { MemoryRouter } from 'react-router-dom';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Search component:', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const searchButton: HTMLElement = screen.getByTestId('search-button');
    const searchInput: HTMLElement = screen.getByTestId('search-input');
    await userEvent.type(searchInput, 'Frodo');
    await userEvent.click(searchButton);
    expect(localStorage.getItem('termForSearching')).toEqual('Frodo');
  });
});
