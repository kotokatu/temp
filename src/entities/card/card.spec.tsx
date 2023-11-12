import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetailedCard } from 'entities/detailed-card';
import { Outlet } from 'react-router-dom';
import { Endpoint } from 'shared/constants';
import {
  mockDetailsResponse,
  mockListItem,
  renderWithNestedRouter,
} from 'tests/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Card } from '.';

describe('Card', () => {
  const user = userEvent.setup();
  const fakeFetch: typeof fetch = async () => {
    return { json: async () => mockDetailsResponse } as Response;
  };
  const fetchSpy = vi.spyOn(window, 'fetch').mockImplementation(fakeFetch);

  beforeEach(() => {
    renderWithNestedRouter(
      <>
        <Card {...mockListItem} />
        <Outlet />
      </>,
      <DetailedCard />,
      {},
      Endpoint.ROOT,
      `${Endpoint.DETAILS}:id`
    );
  });

  afterEach(() => {
    fetchSpy.mockClear();
    cleanup();
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    const { title, year, image, totalSeasons, rating } = mockListItem;
    const description = screen.getByLabelText(/card description/i);
    const checklist = [year, totalSeasons, rating];

    const card = screen.getByRole('link');

    expect(within(card).getByRole('heading')).toHaveTextContent(title ?? '');
    expect(within(card).getByRole('img')).toHaveAttribute('src', image);
    checklist.forEach((prop) => {
      expect(description).toHaveTextContent((prop ?? '').toString());
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    expect(screen.queryByRole('complementary')).toBeNull();

    await user.click(screen.getByRole('link'));
    expect(screen.getByRole('complementary')).toBeVisible();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    expect(fetchSpy).not.toBeCalled();

    for (let i = 1; i <= 5; i += 1) {
      await user.click(screen.getByRole('link'));
      expect(fetchSpy).toBeCalledTimes(i);

      const closeButton = screen.getByRole('button', { name: /close button/i });
      await user.click(closeButton);
    }
  });
});
