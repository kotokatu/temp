import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { data } from '../../mocks';
import App from '../../../components/app';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundry from '../../../components/error-boundry';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Card component', () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });
  test('Validate that clicking on a card opens a detailed card component', async () => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <ErrorBoundry>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundry>
    );
    const items = await screen.findAllByTestId('item-card');
    expect(screen.queryByTestId('item-details')).toBeNull();
    await userEvent.click(items[0]);
    expect(screen.queryByTestId('item-details')).toBeDefined();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    fetchMocker.mockResponse(JSON.stringify(data));
    render(
      <ErrorBoundry>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundry>
    );
    expect(fetchMocker).toHaveBeenCalledTimes(2);
    const items = await screen.findAllByTestId('item-card');
    await userEvent.click(items[0]);
    expect(fetchMocker).toHaveBeenCalledTimes(3);
    expect(fetchMocker.requests()[2].url).toEqual(
      `https://the-one-api.dev/v2/character/5cd99d4bde30eff6ebccfea0`
    );
  });
});

// await userEvent.click(screen.getByTestId('search-button'));
