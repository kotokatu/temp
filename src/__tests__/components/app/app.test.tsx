import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { data, dataByID, dataEmpty } from '../../mocks';
import App from '../../../components/app';
import { MemoryRouter } from 'react-router-dom';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Card component', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Validate that clicking on a card opens a detailed card component', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    expect(screen.queryByTestId('item-details')).toBeNull();
    await userEvent.click(items[0]);
    expect(screen.queryByTestId('item-details')).toBeDefined();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(fetchMocker).toHaveBeenCalledTimes(1);
    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    await userEvent.click(items[0]);
    expect(fetchMocker).toHaveBeenCalledTimes(2);
    expect(fetchMocker.requests()[1].url).toEqual(
      `https://the-one-api.dev/v2/character/5cd99d4bde30eff6ebccfea0`
    );
  });
});

describe('Tests for the Loader', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Check that a loading indicator is displayed while fetching data for ListItem', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeDefined();
    await screen.findAllByTestId('item-card');
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  test('Check that a loading indicator is displayed while fetching data for Detailed Card', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const items = await screen.findAllByTestId('item-card');
    fetchMocker.mockResponse(JSON.stringify(dataByID));
    expect(screen.queryByTestId('loader')).toBeNull();
    userEvent.click(items[1]);
    const loader: HTMLElement = await screen.findByTestId('loader');
    expect(loader).toBeDefined();
    await screen.findByTestId('item-details');
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  test('Ensure that clicking the close button hides the component', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    expect(screen.queryByTestId('item-details')).toBeNull();
    await userEvent.click(items[0]);
    expect(screen.queryByTestId('item-details')).toBeDefined();
    fetchMocker.mockResponse(JSON.stringify(dataEmpty));
    const closeButton: HTMLElement = await screen.findByTestId('btn-close');
    await userEvent.click(closeButton);
    expect(screen.queryByTestId('item-details')).toBeNull();
  });
});
